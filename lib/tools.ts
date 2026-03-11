import {
  Youtube,
  Hash,
  KeyRound,
  FileText,
  Binary,
  Link,
  Link2,
  Fingerprint,
  FileCode,
  Clock,
  Dice6,
  Palette,
  Type,
  FileJson,
  Sparkles
} from "lucide-react"
export type ToolComponentId = "YoutubeThumbnailTool";

export type ToolDefinition = {
  slug: string;
  title: string;
  description: string;
  component: ToolComponentId;
  popular?: boolean;
};

export const tools = [
{
slug: "youtube-thumbnail-downloader",
title: "YouTube Thumbnail Downloader",
description: "Download HD thumbnails from YouTube videos",
icon: Youtube,
gradientFrom: "from-red-500",
gradientTo: "to-pink-500"
},
{
slug: "youtube-title-generator",
title: "YouTube Title Generator",
description: "Generate engaging titles for your YouTube videos",
icon: Sparkles,
gradientFrom: "from-red-400",
gradientTo: "to-orange-500"
},
{
slug: "youtube-tag-generator",
title: "YouTube Tag Generator",
description: "Generate optimized tags for YouTube SEO",
icon: Hash,
gradientFrom: "from-red-500",
gradientTo: "to-yellow-500"
},
{
slug: "word-counter",
title: "Word Counter",
description: "Count words and characters instantly",
icon: Type,
gradientFrom: "from-blue-500",
gradientTo: "to-indigo-500"
},
{
slug: "character-counter",
title: "Character Counter",
description: "Count characters quickly",
icon: Type,
gradientFrom: "from-blue-400",
gradientTo: "to-cyan-500"
},
{
slug: "password-generator",
title: "Password Generator",
description: "Generate strong secure passwords",
icon: KeyRound,
gradientFrom: "from-purple-500",
gradientTo: "to-indigo-500"
},
{
slug: "json-formatter",
title: "JSON Formatter",
description: "Format and beautify JSON data",
icon: FileJson,
gradientFrom: "from-green-500",
gradientTo: "to-emerald-500"
},
{
slug: "base64-encoder",
title: "Base64 Encoder",
description: "Encode and decode Base64 strings",
icon: Binary,
gradientFrom: "from-green-400",
gradientTo: "to-teal-500"
},
{
slug: "url-encoder",
title: "URL Encoder",
description: "Encode URLs safely",
icon: Link,
gradientFrom: "from-indigo-500",
gradientTo: "to-purple-500"
},
{
slug: "url-decoder",
title: "URL Decoder",
description: "Decode encoded URLs",
icon: Link2,
gradientFrom: "from-indigo-400",
gradientTo: "to-blue-500"
},
{
slug: "uuid-generator",
title: "UUID Generator",
description: "Generate unique UUID values",
icon: Fingerprint,
gradientFrom: "from-orange-500",
gradientTo: "to-red-500"
},
{
slug: "markdown-preview",
title: "Markdown Preview",
description: "Preview markdown instantly",
icon: FileCode,
gradientFrom: "from-pink-500",
gradientTo: "to-rose-500"
},
{
slug: "timestamp-converter",
title: "Timestamp Converter",
description: "Convert Unix timestamps",
icon: Clock,
gradientFrom: "from-yellow-500",
gradientTo: "to-orange-500"
},
{
slug: "random-number-generator",
title: "Random Number Generator",
description: "Generate random numbers",
icon: Dice6,
gradientFrom: "from-teal-500",
gradientTo: "to-cyan-500"
},
{
slug: "color-converter",
title: "Color Converter",
description: "Convert HEX, RGB and HSL colors",
icon: Palette,
gradientFrom: "from-fuchsia-500",
gradientTo: "to-purple-500"
}
];
  // Additional tools can be registered here by
  // adding entries to this array.


export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug);
}

