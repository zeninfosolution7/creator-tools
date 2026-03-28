import { NextResponse } from "next/server";

function getVideoId(url: string) {
  const match = url.match(
    /(?:v=|\/)([0-9A-Za-z_-]{11})/
  );
  return match ? match[1] : null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("url");

  if (!videoUrl) {
    return NextResponse.json({ error: "No URL provided" });
  }

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    return NextResponse.json({ error: "Invalid YouTube URL" });
  }

  try {
    // 🔥 Try YouTube page fetch (may fail sometimes)
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = await res.text();

    const match = html.match(/"keywords":\[(.*?)\]/);

    if (match && match[1]) {
      const tags = match[1]
        .split(",")
        .map((tag: string) =>
          tag.replace(/"/g, "").trim()
        );

      return NextResponse.json({ tags });
    }

    // 🔥 Fallback (better UX)
    return NextResponse.json({
      tags: [],
      message: "Tags not publicly available for this video",
    });

  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch video data",
    });
  }
}