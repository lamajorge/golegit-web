/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://golegit.cl",
  generateRobotsTxt: false, // robots.txt ya está en public/
  exclude: ["/privacidad", "/terminos", "/[code]"],
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    // Prioridades por tipo de ruta
    const priorities = {
      "/": 1.0,
      "/simulador": 0.9,
      "/simulador/liquidacion": 0.9,
      "/simulador/jornada": 0.9,
      "/novedades": 0.8,
    };
    return {
      loc: path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: priorities[path] ?? 0.6,
      lastmod: new Date().toISOString(),
    };
  },
};
