import { LucideIcon } from "lucide-react"
import {
  Youtube,
  Hash,
  KeyRound,
  FileJson,
  Link,
  Fingerprint,
  Clock,
  Dice6,
  Palette,
  Type,
  Image,
  Unlock
} from "lucide-react"

export type ToolDefinition = {
  slug: string
  title: string
  description: string
  icon?: LucideIcon
  gradientFrom?: string
  gradientTo?: string
  popular?: boolean
  component?: string
  category?: string
  keywords?: string[]
}

export const tools: ToolDefinition[] = [
{
slug: "youtube-thumbnail-downloader",
title: "YouTube Thumbnail Downloader",
description: "Download HD thumbnails from YouTube videos",
icon: Youtube,
gradientFrom: "from-red-500",
gradientTo: "to-pink-500",
popular: true,
component: "YoutubeThumbnailTool",
category: "creator",
keywords: [
"youtube thumbnail downloader",
"download youtube thumbnail",
"yt thumbnail grabber"]
},
{
slug: "word-counter",
title: "Word Counter",
description: "Count words and characters instantly",
icon: Hash,
category: "seo",
component: "WordCounterTool"
},
{
slug: "password-generator",
title: "Password Generator",
description: "Generate strong passwords",
icon: KeyRound,
category: "security",
component: "PasswordGeneratorTool"
},
{
slug: "json-formatter",
title: "JSON Formatter",
description: "Format JSON instantly",
icon: FileJson,
category: "developer",
component: "JsonFormatterTool"
},
{
slug: "url-encoder",
title: "URL Encoder",
description: "Encode URLs safely",
icon: Link,
category: "seo"
},
{
slug: "uuid-generator",
title: "UUID Generator",
description: "Generate UUID values",
icon: Fingerprint,
category: "developer"
},
{
slug: "timestamp-converter",
title: "Timestamp Converter",
description: "Convert Unix timestamps",
icon: Clock,
category: "developer"
},
{
slug: "random-number-generator",
title: "Random Number Generator",
description: "Generate random numbers",
icon: Dice6,
category: "developer"
},
{
slug: "color-converter",
title: "Color Converter",
description: "Convert HEX RGB HSL colors",
icon: Palette,
category: "developer"
},
{
slug: "character-counter",
title: "Character Counter",
description: "Count characters instantly",
icon: Type,
category: "developer"
},
{
slug: "image-compressor",
title: "Image Compressor",
description: "Compress images online",
icon: Image,
category: "image"
},
{
slug: "unlock-pdf",
title: "Unlock PDF",
description: "Remove restrictions and unlock protected PDF files.",
icon: Unlock,
component: "PdfUnlockTool",
category: "pdf",
popular: true
}
]

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug)
}

