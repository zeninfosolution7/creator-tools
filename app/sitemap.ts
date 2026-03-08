import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://creatortools.co.in";

  const tools = [
    "youtube-thumbnail-downloader",
    "youtube-tag-extractor",
    "youtube-title-generator",
    "youtube-description-generator",
    "youtube-channel-id-finder",
    "instagram-hashtag-generator",
    "instagram-caption-generator",
    "instagram-bio-generator",
    "tiktok-caption-generator",
    "tiktok-hashtag-generator",
  ];

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...toolPages,
  ];
}