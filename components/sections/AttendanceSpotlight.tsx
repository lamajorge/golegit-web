import React from "react";

function MonthCalendar() {
  const dayStates: Record<number, string> = {
    1: "ok", 2: "ok", 3: "feriado",
    6: "ok", 7: "ok", 8: "ok", 9: "ok", 10: "ok",
    13: "ok", 14: "ok", 15: "licencia", 16: "licencia", 17: "licencia",
    20: "ok", 21: "ok", 22: "vacaciones", 23: "vacaciones", 24: "vacaciones",
    27: "ok", 28: "ausencia", 29: "ok", 30: "ok",
  };
  const colors: Record<string, string> = {
    ok: "bg-emerald-100 text-emerald-700",
    feriado: "bg-gray-200 text-gray-600",
    licencia: "bg-amber-100 text-amber-700",
    vacaciones: "bg-sky-100 text-sky-700",
    ausencia: "bg-red-100 text-red-700",
    finde: "bg-gray-50 text-gray-300",
  };
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < 2; i++) {
    cells.push(<div key={`e-${i}`} className="h-8" />);
  }
  for (let d = 1; d <= 30; d++) {
    const dow = (2 + (d - 1)) % 7;
    let state = dayStates[d];
    if (!state) state = dow >= 5 ? "finde" : "ok";
    cells.push(
      <div
        key={d}
        className={`h-8 rounded-md text-[10px] font-semibold flex items-center justify-center ${colors[state]}`}
      >
        {d}
      </div>,
    );
  }
  return <div className="grid grid-cols-7 gap-1">{cells}</div>;
}

export default function AttendanceSpotlight() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* Texto */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-widest text-brand-700 uppercase mb-5">
              Control de asistencia
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tight mb-6">
              Cada día registrado.
              <br />
              <span className="text-ink-muted font-bold">Cada reporte a la mano.</span>
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed mb-10 max-w-xl">
              Tu trabajadora marca entrada y salida desde su celular. Tú ves
              el mes completo en una vista calendario, con los días laborales,
              licencias, vacaciones y ausencias diferenciados.
              Los cuatro reportes del Art. 27 de la Resolución 38 exenta de la
              Dirección del Trabajo se generan solos.
            </p>

            <ul className="space-y-3.5 mb-8">
              {[
                "Marcación con fecha, hora y geolocalización opcional",
                "Vista calendario mensual con estados de cada día",
                "Reportes legales: asistencia diaria, jornada, domingos e incidentes",
                "Modificaciones con aprobación bilateral en 48 horas",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-ink-muted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-3 max-w-md">
              <svg
                className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p className="text-sm text-ink-muted leading-relaxed">
                <span className="font-semibold text-ink">Sistema auxiliar.</span>{" "}
                No reemplaza el libro de asistencia físico hasta obtener la
                certificación de la Dirección del Trabajo.
              </p>
            </div>
          </div>

          {/* Calendario — flotando, sin card padre */}
          <div className="lg:col-span-6 relative">
            <div
              className="absolute -inset-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,197,94,0.08) 0%, transparent 70%)",
              }}
            />
            <div className="relative rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] overflow-hidden ring-1 ring-black/5">
              <div className="bg-zinc-950 px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-bold">Abril 2026</p>
                  <p className="text-white/50 text-xs">María L. · Puertas afuera</p>
                </div>
                <span className="text-[10px] font-semibold text-brand-400 tracking-wide">
                  Res. 38 DT
                </span>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-7 gap-1 text-[10px] font-semibold text-gray-400 text-center mb-2">
                  {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                    <div key={i}>{d}</div>
                  ))}
                </div>

                <MonthCalendar />

                <div className="flex items-center gap-5 mt-5 pt-4 border-t border-gray-100 flex-wrap">
                  {[
                    { label: "Trabajado", color: "bg-emerald-400" },
                    { label: "Licencia", color: "bg-amber-400" },
                    { label: "Vacaciones", color: "bg-sky-400" },
                    { label: "Ausencia", color: "bg-red-400" },
                    { label: "Feriado", color: "bg-gray-300" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${l.color}`} />
                      <span className="text-[10px] text-gray-500">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
