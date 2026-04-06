import { NextRequest, NextResponse } from "next/server";

// Subdomain routing skeleton para GoLegit multi-producto
// Hoy solo existe "home" (raíz). "business" es futuro.
//
// Arquitectura objetivo:
//   golegit.cl          → raíz (landing home/tcp, producto actual)
//   home.golegit.cl     → mismo contenido que raíz (alias)
//   business.golegit.cl → /business/* (próximamente)
//
// En desarrollo local los subdominios no funcionan — usar rutas directas.

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") ?? "";
  const subdomain = hostname.split(".")[0];

  // En local o Vercel preview, no hacer nada
  if (
    hostname.includes("localhost") ||
    hostname.includes("vercel.app") ||
    hostname.includes("127.0.0.1")
  ) {
    return NextResponse.next();
  }

  // home.golegit.cl → sirve la raíz normalmente
  if (subdomain === "home") {
    return NextResponse.rewrite(new URL(req.nextUrl.pathname, req.url));
  }

  // business.golegit.cl → reescribe a /business/* (ruta aún no creada)
  // Descomentar cuando exista app/business/
  // if (subdomain === "business") {
  //   return NextResponse.rewrite(
  //     new URL(`/business${req.nextUrl.pathname}`, req.url)
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  // Aplica a todas las rutas excepto assets estáticos y API de Next.js
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo/).*)"],
};
