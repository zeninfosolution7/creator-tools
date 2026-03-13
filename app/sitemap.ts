import { tools } from "@/lib/tools"

export default function sitemap() {

  const baseUrl = "https://www.creatortools.co.in"

  // Tool pages
  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
  }))

  // Category pages
  const categories = [...new Set(tools.map((tool) => tool.category))]

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categories/${category}`,
    lastModified: new Date(),
  }))

  return [

    {
      url: baseUrl,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
    },

    ...toolPages,

    ...categoryPages,

  ]

}