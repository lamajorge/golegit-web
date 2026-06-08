import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export default function FooterBusiness() {
  return (
    <footer className="bg-zinc-950 text-white/40">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="mb-4">
              <img
                src="/logo/golegit-business-logo-dark.svg"
                alt="GoLegit Business — El aliado legal de tu pyme"
                height={28}
                style={{ height: 28, width: "auto" }}
              />
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              El aliado legal de tu pyme. Tu sociedad, tus datos, tus contratos
              y tu equipo en regla — sin complicaciones.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4">Producto</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/business#modulos" className="text-sm hover:text-white transition-colors">
                  Qué incluye
                </a>
              </li>
              <li>
                <a href="/business#contadores" className="text-sm hover:text-white transition-colors">
                  Para contadores y abogados
                </a>
              </li>
              <li>
                <a href="/business#waitlist" className="text-sm hover:text-white transition-colors">
                  Early access
                </a>
              </li>
            </ul>
          </div>

          {/* GoLegit */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4">GoLegit</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  GoLegit Home (casa particular)
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-sm hover:text-white transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-sm hover:text-white transition-colors">
                  Términos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4">Contacto</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {SITE_CONFIG.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Cubillos Lama SpA · RUT 78.393.969-K
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="text-xs hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-xs hover:text-white transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
