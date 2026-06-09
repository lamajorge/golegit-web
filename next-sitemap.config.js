/** @type {import('next-sitemap').IConfig} */

const { Client, isFullPage } = require("@notionhq/client");

const NOVEDADES_DB_ID = process.env.NOTION_DB_ID ?? "";
const RECURSOS_DB_ID = process.env.NOTION_RECURSOS_DB_ID ?? "";
const NOTION_TOKEN = process.env.NOTION_TOKEN ?? "";

async function fetchSlugs(databaseId) {
  if (!databaseId || !NOTION_TOKEN) return [];
  const notion = new Client({ auth: NOTION_TOKEN });
  try {
    const res = await notion.databases.query({
      database_id: databaseId,
      filter: { property: "Publicado", checkbox: { equals: true } },
      sorts: [{ property: "Fecha", direction: "descending" }],
    });
    return res.results.filter(isFullPage).map((page) => {
      const props = page.properties;
      const slug =
        (props["Slug"]?.rich_text ?? []).map((t) => t.plain_text).join("").trim() || null;
      const fecha = props["Fecha"]?.date?.start ?? page.last_edited_time?.split("T")[0] ?? null;
      return { slug, fecha };
    });
  } catch (err) {
    console.warn("[sitemap] Notion query falló:", err?.message);
    return [];
  }
}

module.exports = {
  siteUrl: "https://golegit.cl",
  generateRobotsTxt: false, // robots.txt ya está en public/
  exclude: ["/privacidad", "/terminos", "/[code]"],
  changefreq: "weekly",
  priority: 0.7,

  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,        // landing-paraguas de marca
      "/home": 0.9,    // landing TCP/Home (servida en home.golegit.cl)
      "/simulador": 0.9,
      "/simulador/liquidacion": 0.9,
      "/simulador/jornada": 0.9,
      "/novedades": 0.8,
      "/recursos": 0.8,
      "/verificar": 0.6,
    };
    return {
      loc: path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: priorities[path] ?? 0.6,
      lastmod: new Date().toISOString(),
    };
  },

  additionalPaths: async () => {
    const paths = [];
    const [novedades, recursos] = await Promise.all([
      fetchSlugs(NOVEDADES_DB_ID),
      fetchSlugs(RECURSOS_DB_ID),
    ]);
    for (const { slug, fecha } of novedades) {
      if (!slug) continue;
      paths.push({
        loc: `/novedades/${slug}`,
        changefreq: "monthly",
        priority: 0.7,
        lastmod: fecha ? new Date(fecha).toISOString() : new Date().toISOString(),
      });
    }
    for (const { slug, fecha } of recursos) {
      if (!slug) continue;
      paths.push({
        loc: `/recursos/${slug}`,
        changefreq: "monthly",
        priority: 0.7,
        lastmod: fecha ? new Date(fecha).toISOString() : new Date().toISOString(),
      });
    }
    return paths;
  },
};
