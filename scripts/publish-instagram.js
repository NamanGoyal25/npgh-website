/**
 * publish-instagram.js
 *
 * Zero-touch daily pipeline:
 *   1. Ask Gemini for a fresh architectural headline + Instagram caption.
 *   2. Build the Vercel OG poster URL for that headline (app/api/og/route.tsx).
 *   3. Create an Instagram media container pointed at that image, poll until
 *      Meta finishes processing it, then publish it.
 *
 * Deliberately zero npm dependencies — uses Node's built-in `fetch` (Node 18+)
 * for both the Gemini REST call and the Meta Graph API calls, so this script
 * never needs `npm install` to run in CI. Requires env vars:
 *   GEMINI_API_KEY, IG_USER_ID, IG_ACCESS_TOKEN, VERCEL_URL
 */

const GEMINI_MODEL = "gemini-2.5-flash";
const GRAPH_API_VERSION = "v21.0";

const POLL_INTERVAL_MS = 5000;
const POLL_MAX_ATTEMPTS = 24; // ~2 minutes total

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Normalizes VERCEL_URL into a full origin. Vercel's own system env var
 * (when auto-populated on a deployment) is a bare host with no protocol,
 * e.g. "npgh-website.vercel.app" — but this may also be set by hand as a
 * repo secret with the protocol already included. Handle both.
 */
function normalizeOrigin(rawUrl) {
  return /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
}

/**
 * Calls Gemini with a strict JSON response schema so we get back exactly
 * { headline, caption } with no prose wrapper, no markdown fences to strip.
 */
async function generateContent(apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const prompt = `You are the social media copywriter for New Punjab Glass House (NPGH), a
premium wholesale aluminium section supplier and bespoke architectural glass
studio in Ludhiana, Punjab — three decades of precision craftsmanship,
serving luxury independent homes, Gurdwaras, and temples.

Generate today's Instagram post content. Return:
- headline: a short, punchy architectural insight or title (under 8 words)
  about aluminium sections or luxury glass design. This will be rendered as
  the large headline on a 1080x1080 poster image, so keep it tight — no
  trailing punctuation, no quotation marks.
- caption: an engaging, on-brand Instagram caption (2-4 short sentences)
  that expands on the headline, ends with a soft call-to-action, and
  includes 6-10 relevant luxury/architecture/interior-design hashtags
  (e.g. #LuxuryDesign #ArchitecturalGlass #AluminiumSections #Ludhiana).

Do not repeat the headline verbatim inside the caption's opening line.`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          headline: { type: "STRING" },
          caption: { type: "STRING" },
        },
        required: ["headline", "caption"],
      },
    },
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error(`Gemini returned no content: ${JSON.stringify(data)}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new Error(`Failed to parse Gemini JSON output: ${text}`);
  }

  if (!parsed.headline || !parsed.caption) {
    throw new Error(`Gemini JSON missing headline/caption: ${text}`);
  }

  return { headline: parsed.headline.trim(), caption: parsed.caption.trim() };
}

/** Step 1 of the Graph API flow: create the media container. */
async function createMediaContainer({ igUserId, accessToken, imageUrl, caption }) {
  const url = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media`);
  url.searchParams.set("image_url", imageUrl);
  url.searchParams.set("caption", caption);
  url.searchParams.set("access_token", accessToken);

  const res = await fetch(url, { method: "POST" });
  const data = await res.json();

  if (!res.ok || !data.id) {
    throw new Error(`Failed to create IG media container: ${JSON.stringify(data)}`);
  }

  return data.id;
}

/** Step 2: poll the container until Meta finishes processing the image. */
async function waitForContainerReady({ containerId, accessToken }) {
  for (let attempt = 1; attempt <= POLL_MAX_ATTEMPTS; attempt++) {
    const url = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${containerId}`);
    url.searchParams.set("fields", "status_code,status");
    url.searchParams.set("access_token", accessToken);

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to poll container status: ${JSON.stringify(data)}`);
    }

    if (data.status_code === "FINISHED") {
      return;
    }
    if (data.status_code === "ERROR" || data.status_code === "EXPIRED") {
      throw new Error(`IG container ${containerId} failed processing: ${JSON.stringify(data)}`);
    }

    // status_code is "IN_PROGRESS" (or similar) — wait and retry.
    console.log(`Container ${containerId} still processing (attempt ${attempt}/${POLL_MAX_ATTEMPTS})...`);
    await sleep(POLL_INTERVAL_MS);
  }

  throw new Error(`IG container ${containerId} did not finish processing within the timeout window.`);
}

/** Step 3: publish the ready container to the IG feed. */
async function publishContainer({ igUserId, accessToken, containerId }) {
  const url = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media_publish`);
  url.searchParams.set("creation_id", containerId);
  url.searchParams.set("access_token", accessToken);

  const res = await fetch(url, { method: "POST" });
  const data = await res.json();

  if (!res.ok || !data.id) {
    throw new Error(`Failed to publish IG container: ${JSON.stringify(data)}`);
  }

  return data.id;
}

async function main() {
  const geminiApiKey = requireEnv("GEMINI_API_KEY");
  const igUserId = requireEnv("IG_USER_ID");
  const igAccessToken = requireEnv("IG_ACCESS_TOKEN");
  const vercelUrl = requireEnv("VERCEL_URL");

  console.log("Requesting today's headline + caption from Gemini...");
  const { headline, caption } = await generateContent(geminiApiKey);
  console.log(`Headline: ${headline}`);

  const origin = normalizeOrigin(vercelUrl);
  const imageUrl = `${origin}/api/og?title=${encodeURIComponent(headline)}`;
  console.log(`Poster URL: ${imageUrl}`);

  console.log("Creating Instagram media container...");
  const containerId = await createMediaContainer({
    igUserId,
    accessToken: igAccessToken,
    imageUrl,
    caption,
  });
  console.log(`Container created: ${containerId}`);

  console.log("Waiting for Meta to finish processing the image...");
  await waitForContainerReady({ containerId, accessToken: igAccessToken });

  console.log("Publishing to Instagram...");
  const mediaId = await publishContainer({
    igUserId,
    accessToken: igAccessToken,
    containerId,
  });

  console.log(`Published successfully. Media ID: ${mediaId}`);
}

main().catch((err) => {
  console.error("publish-instagram.js failed:", err.message || err);
  process.exit(1);
});
