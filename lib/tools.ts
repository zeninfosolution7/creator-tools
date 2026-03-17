
import {
  LucideIcon,
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
  Unlock,
  Calculator,
Percent,
Activity,
Tag,
Banknote,
Utensils,
Ruler,
CalendarDays,
Sigma,
Sparkles,
FileText,
MessageSquareText,
Search,
PenLine,
Lightbulb,
User,
AlignLeft,
Droplet
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
slug: "color-converter",
title: "Color Converter",
description: "Convert HEX RGB HSL colors",
icon: Palette,
component: "ColorConverterTool",
category: "developer"
},
{
slug: "character-counter",
title: "Character Counter",
description: "Count characters instantly",
icon: Type,
component: "CharacterCounterTool",
category: "developer"
},
{
slug: "image-compressor",
title: "Image Compressor",
description: "Compress images online",
icon: Image,
component: "ImageCompressorTool",
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
},
{
slug: "age-calculator",
title: "Age Calculator",
description: "Calculate age from date of birth instantly using our free online age calculator.",
icon: CalendarDays,
component: "AgeCalculatorTool",
category: "math",
popular: true
},

{
slug: "percentage-calculator",
title: "Percentage Calculator",
description: "Calculate percentages quickly including percentage increase and decrease.",
icon: Percent,
component: "PercentageCalculatorTool",
category: "math",
popular: true
},

{
slug: "bmi-calculator",
title: "BMI Calculator",
description: "Calculate Body Mass Index using height and weight to check health status.",
icon: Activity,
component: "BMICalculatorTool",
category: "math",
popular: true
},

{
slug: "discount-calculator",
title: "Discount Calculator",
description: "Calculate final price after discount and savings instantly.",
icon: Tag,
component: "DiscountCalculatorTool",
category: "math",
popular: true
},

{
slug: "emi-calculator",
title: "EMI Calculator",
description: "Calculate monthly loan EMI using interest rate and tenure.",
icon: Banknote,
component: "EMICalculatorTool",
category: "math",
popular: true
},

{
slug: "random-number-generator",
title: "Random Number Generator",
description: "Generate random numbers between a minimum and maximum value.",
icon: Dice6,
component: "RandomNumberGeneratorTool",
category: "math",
popular: true
},

{
slug: "tip-calculator",
title: "Tip Calculator",
description: "Calculate restaurant tips and total bill amount instantly.",
icon: Utensils,
component: "TipCalculatorTool",
category: "math",
popular: false
},
/*
{
slug: "length-converter",
title: "Length Converter",
description: "Convert between meters, feet, inches and other length units.",
icon: Ruler,
component: "LengthConverterTool",
category: "math",
popular: false
},
*/
{
slug: "date-difference-calculator",
title: "Date Difference Calculator",
description: "Calculate the number of days between two dates easily.",
icon: CalendarDays,
component: "DateDifferenceTool",
category: "math",
popular: false
},

{
slug: "scientific-calculator",
title: "Scientific Calculator",
description: "Perform advanced math calculations and evaluate expressions instantly.",
icon: Sigma,
component: "ScientificCalculatorTool",
category: "math",
popular: true
},

{
slug: "ai-text-summarizer",
title: "AI Text Summarizer",
description: "Summarize long text instantly using an AI powered text summarizer.",
icon: FileText,
component: "AiTextSummarizerTool",
category: "artificial-intelligence",
popular: true
},

{
slug: "ai-title-generator",
title: "AI Title Generator",
description: "Generate catchy titles for blogs, videos and articles using AI.",
icon: Sparkles,
component: "AiTitleGeneratorTool",
category: "artificial-intelligence",
popular: true
},

{
slug: "ai-paragraph-generator",
title: "AI Paragraph Generator",
description: "Generate paragraphs on any topic instantly using AI writing tools.",
icon: MessageSquareText,
component: "AiParagraphGeneratorTool",
category: "artificial-intelligence",
popular: true
},

{
slug: "ai-hashtag-generator",
title: "AI Hashtag Generator",
description: "Generate trending hashtags for social media posts automatically.",
icon: Hash,
component: "AiHashtagGeneratorTool",
category: "artificial-intelligence",
popular: true
},

{
slug: "ai-keyword-generator",
title: "AI Keyword Generator",
description: "Generate SEO keywords and search ideas using AI.",
icon: Search,
component: "AiKeywordGeneratorTool",
category: "artificial-intelligence",
popular: true
},

{
slug: "ai-sentence-rewriter",
title: "AI Sentence Rewriter",
description: "Rewrite sentences instantly with AI for better clarity and readability.",
icon: PenLine,
component: "AiSentenceRewriterTool",
category: "artificial-intelligence",
popular: false
},

{
slug: "ai-blog-idea-generator",
title: "AI Blog Idea Generator",
description: "Generate creative blog post ideas using AI.",
icon: Lightbulb,
component: "AiBlogIdeaGeneratorTool",
category: "artificial-intelligence",
popular: true
},

{
slug: "ai-username-generator",
title: "AI Username Generator",
description: "Generate unique usernames for social media using AI.",
icon: User,
component: "AiUsernameGeneratorTool",
category: "artificial-intelligence",
popular: false
},

{
slug: "ai-meta-description-generator",
title: "AI Meta Description Generator",
description: "Generate SEO friendly meta descriptions automatically using AI.",
icon: AlignLeft,
component: "AiMetaDescriptionGeneratorTool",
category: "artificial-intelligence",
popular: true
},

{
slug: "ai-caption-generator",
title: "AI Caption Generator",
description: "Generate captions for Instagram, Facebook and social media posts.",
icon: Image,
component: "AiCaptionGeneratorTool",
category: "artificial-intelligence",
popular: true
},

{
  slug: "tank-calculator",
  title: "Tank Volume Calculator",
  description:     "Calculate water tank capacity in liters, cubic meters and cubic feet. Supports cylindrical and rectangular tanks with filling time calculation.",
  component: "TankCalculatorTool",
  category: "calculator",

  seoContent: {
    intro: "This tank calculator helps you calculate water tank capacity...",
    formula: "Volume = π × r² × h",
    example: "If diameter is 2m and height is 3m, volume ≈ 9420 liters",
    faqs: [
      {
        q: "How to calculate tank capacity?",
        a: "Use volume formula and convert to liters."
      },
      {
        q: "Can I use different units?",
        a: "Yes, this tool supports multiple units."
      }
    ]
  }
}

]

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug)
}

