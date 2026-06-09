import { NextRequest, NextResponse } from "next/server";

// Subdomain routing para GoLegit multi-producto.
//
// Arquitectura (09-jun-2026):
//   golegit.cl          → APEX: landing-paraguas de marca (app/page.tsx)
//   home.golegit.cl     → landing TCP/Home → reescribe a /home/*
//   business.golegit.cl → proyecto Vercel SEPARADO (golegit-business) — NO lo
//                         sirve este repo; no se rutea acá.
//
// En desarrollo local los subdominios no funcionan — usar /home directo.

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") ?? "";
  const subdomain = hostname.split(".")[0];

  // En local o Vercel preview, no hacer nada (acceder a /home directo).
  if (
    hostname.includes("localhost") ||
    hostname.includes("vercel.app") ||
    hostname.includes("127.0.0.1")
  ) {
    return NextResponse.next();
  }

  // home.golegit.cl → sirve la landing TCP que vive en /home/* (el usuario ve
  // home.golegit.cl/, internamente se reescribe a /home sin exponer el path).
  if (subdomain === "home") {
    const url = req.nextUrl.clone();
    const p = req.nextUrl.pathname;
    // Evitar doble prefijo si ya viene /home; raíz "/" → "/home".
    url.pathname = p === "/" ? "/home" : p.startsWith("/home") ? p : `/home${p}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Aplica a todas las rutas excepto:
  //  - assets estáticos (_next, favicon, logo)
  //  - cualquier archivo con extensión en la raíz (sitemap.xml, robots.txt,
  //    googlec...html para Search Console, etc.) — debe servirse directo.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo/|.*\\.[\\w]+$).*)"],
};
