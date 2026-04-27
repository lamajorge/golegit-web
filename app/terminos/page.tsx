import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones — GoLegit",
  robots: { index: false },
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-paper py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-brand-600 hover:text-brand-700 mb-6 inline-block">
          ← Volver al inicio
        </Link>

        <h1
          className="text-4xl font-light text-ink mb-2"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Términos y Condiciones de Servicio
        </h1>
        <p className="text-sm text-ink-light mb-10">
          Última actualización: 16 de abril de 2026 · Versión 1.0
        </p>

        <article className="prose prose-sm max-w-none text-ink-muted space-y-4 prose-headings:text-ink prose-h2:text-lg prose-h2:font-bold prose-h2:mt-14 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-ink/10 prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2 prose-strong:text-ink-soft prose-strong:font-semibold prose-a:text-brand-600 prose-table:text-xs prose-th:bg-ink/5 prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1 prose-td:align-top prose-td:border-b prose-td:border-ink/5">

          <p>
            Los presentes Términos y Condiciones (en adelante, los <strong>“Términos”</strong>) rigen el
            acceso y uso del servicio <strong>GoLegit</strong>, ofrecido por <strong>Cubillos Lama
            SpA</strong>, RUT <strong>78.393.969-K</strong>, con domicilio en la ciudad de Santiago de
            Chile (en adelante, <strong>“GoLegit”</strong> o el <strong>“Operador”</strong>), al
            empleador, empleadora, persona natural o jurídica que contrata el servicio (en adelante,
            el <strong>“Cliente”</strong>), así como al trabajador o trabajadora cuyos datos son
            gestionados a través de la plataforma (en adelante, el o la <strong>“Trabajador/a”</strong>).
          </p>

          <p>
            Al registrarse, contratar un plan o utilizar el servicio de cualquier forma, el Cliente
            declara haber leído, comprendido y aceptado íntegramente estos Términos, así como la{" "}
            <Link href="/privacidad">Política de Privacidad</Link>, que forma parte integrante de los
            mismos. Si el Cliente no está de acuerdo con alguna de sus disposiciones, debe abstenerse
            de contratar o utilizar el servicio.
          </p>

          {/* 1 */}
          <section>
            <h2>1. Definiciones</h2>
            <p>Para efectos de los presentes Términos, las expresiones siguientes tendrán el significado que se indica:</p>
            <ul>
              <li><strong>Servicio:</strong> la plataforma GoLegit, que permite al Cliente gestionar relaciones laborales con Trabajadores/as de casa particular (TCP) conforme a la legislación chilena, mediante mensajería WhatsApp y portales web.</li>
              <li><strong>Plataforma:</strong> el conjunto de software, interfaces, bases de datos, APIs y portales que componen el Servicio, incluyendo <em>app.golegit.cl</em>, <em>golegit.cl</em> y la cuenta oficial de WhatsApp de GoLegit.</li>
              <li><strong>Cuenta:</strong> el registro de identificación del Cliente en el Servicio, asociado a un número de teléfono móvil y a un correo electrónico.</li>
              <li><strong>Plan:</strong> modalidad de suscripción contratada por el Cliente (Lite, Pro o Plus), que determina las funcionalidades, límites y precios aplicables.</li>
              <li><strong>Documento:</strong> cualquier instrumento generado por la Plataforma a partir de los datos ingresados por el Cliente, incluyendo —sin limitar— contrato de trabajo, anexo, liquidación de remuneraciones, finiquito, carta de aviso, amonestación, certificado de vacaciones, certificado de antigüedad y protocolo Ley Karin.</li>
              <li><strong>FES:</strong> firma electrónica simple en los términos del artículo 3° de la Ley N° 19.799 sobre documentos electrónicos, firma electrónica y servicios de certificación.</li>
              <li><strong>Trabajador/a:</strong> persona natural contratada por el Cliente para prestar servicios de casa particular conforme al Código del Trabajo (CT), cuyos datos son tratados en la Plataforma por encargo del Cliente.</li>
              <li><strong>Datos Personales:</strong> toda información vinculada o referida a una persona natural identificada o identificable, en los términos de la Ley N° 21.719.</li>
              <li><strong>Agencia:</strong> la Agencia de Protección de Datos Personales creada por la Ley N° 21.719.</li>
              <li><strong>Código del Trabajo (CT):</strong> el Decreto con Fuerza de Ley N° 1 de 2002 del Ministerio del Trabajo y Previsión Social, y sus modificaciones.</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2>2. Descripción del Servicio</h2>
            <p>
              GoLegit es una herramienta digital que asiste al Cliente en la formalización y
              administración de la relación laboral con su Trabajador/a, conforme a la normativa
              chilena aplicable (Título II, Capítulo V, Párrafo 2° del CT, sobre trabajadores de casa
              particular, y demás normas laborales, previsionales y tributarias vigentes).
            </p>
            <p>El Servicio permite, según el Plan contratado:</p>
            <ul>
              <li>Generar y firmar electrónicamente contratos de trabajo, anexos, finiquitos y cartas de aviso.</li>
              <li>Calcular liquidaciones mensuales, cotizaciones previsionales, asignación familiar e IATCE conforme a los parámetros legales vigentes.</li>
              <li>Registrar ausencias, licencias médicas, amonestaciones, vacaciones y días especiales trabajados.</li>
              <li>Gestionar el protocolo de Ley Karin (Ley N° 21.643) obligatorio para empleadores.</li>
              <li>Ofrecer un portal web autenticado al Cliente y —en los planes Pro y Plus— al/la Trabajador/a, con documentos históricos y firma electrónica FES.</li>
            </ul>
            <p>
              El Servicio <strong>no sustituye el asesoramiento legal especializado</strong> para
              casos particulares complejos. Los cálculos, modelos y contenidos ofrecidos se basan en
              parámetros legales generales vigentes al momento de su generación y en los datos
              proporcionados por el Cliente.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2>3. Registro, Cuenta y Verificación</h2>
            <h3>3.1 Requisitos de registro</h3>
            <p>
              Para crear una Cuenta, el Cliente debe proporcionar información veraz, actual y
              completa, incluyendo al menos: nombre completo, RUT, correo electrónico válido,
              número de teléfono móvil activo y domicilio. GoLegit podrá solicitar documentación
              adicional para verificar la identidad del Cliente o la del Trabajador/a cuando resulte
              necesario para la correcta prestación del Servicio.
            </p>

            <h3>3.2 Seguridad de la Cuenta</h3>
            <p>
              El Cliente es el único responsable de mantener la confidencialidad de sus credenciales
              de acceso (magic link, PIN de firma, etc.), así como de toda actividad que ocurra bajo
              su Cuenta. En caso de pérdida, sospecha de uso no autorizado o compromiso de sus
              credenciales, debe notificar de inmediato a GoLegit a <strong>soporte@golegit.cl</strong>.
            </p>

            <h3>3.3 Una Cuenta por Cliente — prohibición de reventa</h3>
            <p>
              La Cuenta es personal e intransferible. El Cliente no podrá ceder, arrendar ni
              transferir su acceso a terceros, ni utilizar una misma Cuenta para gestionar a
              Trabajadores/as de empleadores distintos. Esta prohibición alcanza, en particular, a
              consultores, asesores contables o laborales que pretendan operar la Plataforma por
              cuenta de múltiples clientes mediante una sola suscripción.
            </p>

            <h3>3.4 Verificación biométrica del/la Trabajador/a</h3>
            <p>
              Para habilitar la firma electrónica desde el portal, el o la Trabajador/a podrá
              someterse a un proceso voluntario de verificación de identidad basado en OCR de cédula
              y comparación biométrica facial (umbral mínimo 80%). Su consentimiento se recaba
              previamente, se almacena en evidencia inmutable y se rige por la{" "}
              <Link href="/privacidad">Política de Privacidad</Link>, numerales 4 y 11.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2>4. Planes, Precios y Suscripción</h2>
            <h3>4.1 Planes disponibles</h3>
            <p>
              GoLegit ofrece actualmente tres Planes, cuyas características y precios vigentes se
              publican en <Link href="/#planes">golegit.cl/#planes</Link>:
            </p>
            <ul>
              <li><strong>Plan Lite:</strong> módulos de gestión del empleador, sin portal de Trabajador/a y sin firma FES.</li>
              <li><strong>Plan Pro:</strong> Lite + portal de Trabajador/a, firma FES y recordatorios proactivos.</li>
              <li><strong>Plan Plus:</strong> Pro + Trabajadores/as ilimitados/as por empleador.</li>
            </ul>
            <p>
              Los precios se expresan en pesos chilenos, IVA incluido cuando corresponda, y pueden
              ser ajustados en los términos del numeral 4.5 siguiente.
            </p>

            <h3>4.2 Período de prueba</h3>
            <p>
              Al crear una Cuenta, el Cliente accede a un período de prueba gratuito con
              funcionalidades equivalentes al Plan Pro, por un plazo de <strong>treinta (30) días
              corridos</strong>, sin obligación de pago ni de suscripción posterior. Al vencimiento,
              deberá contratar un Plan para continuar utilizando el Servicio.
            </p>

            <h3>4.3 Procesador de pagos</h3>
            <p>
              Los pagos se procesan mediante <strong>Mercado Pago</strong> (MercadoLibre Chile
              Limitada), bajo sus propios términos y políticas. GoLegit no almacena datos completos
              de tarjetas de crédito o débito; solo conserva el identificador de suscripción
              entregado por el procesador y los metadatos de pago necesarios para la operación.
            </p>

            <h3>4.4 Renovación automática</h3>
            <p>
              Las suscripciones se renuevan automáticamente al vencimiento de cada período,
              cargando el medio de pago registrado, salvo cancelación expresa del Cliente. La
              cancelación puede ejercerse en cualquier momento desde el portal del Cliente o
              comunicándola a <strong>soporte@golegit.cl</strong>; surtirá efecto al término del
              período de facturación vigente y no se cobrarán períodos posteriores.
            </p>
            <p>
              GoLegit notificará por correo electrónico, con anticipación razonable, las
              próximas renovaciones, así como cualquier modificación de precios u otras
              condiciones que afecten el cobro siguiente, en los términos del numeral 4.5 y del
              artículo 12 A de la Ley N° 19.496.
            </p>

            <h3>4.5 Ajuste de precios</h3>
            <p>
              GoLegit podrá reajustar los precios de sus Planes al menos una (1) vez al año, con
              base en variables objetivas y verificables (IPC, UF, costos operativos medibles). Todo
              ajuste será informado al Cliente con a lo menos <strong>treinta (30) días
              corridos</strong> de anticipación a su entrada en vigor, por correo electrónico y en
              la Plataforma. El Cliente que no esté de acuerdo podrá terminar la relación conforme
              al numeral 13, sin cargo por conceptos posteriores al cambio.
            </p>

            <h3>4.6 Facturación y documentos tributarios</h3>
            <p>
              GoLegit emite documento tributario electrónico (boleta o factura, según el tipo de
              Cliente) por cada cobro exitoso, a los datos indicados al momento de la contratación.
              Su correcta emisión depende de la exactitud de los datos proporcionados; será
              responsabilidad del Cliente mantenerlos actualizados.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2>5. Derecho de Retracto y Cancelación Anticipada</h2>
            <h3>5.1 Retracto legal (Ley N° 19.496, artículo 3º bis letra b)</h3>
            <p>
              Tratándose de un contrato celebrado por medios electrónicos, el Cliente podrá
              desistir unilateralmente del contrato dentro de los <strong>diez (10) días corridos
              </strong> contados desde la contratación del Servicio, comunicando su decisión a
              <strong> soporte@golegit.cl</strong>.
            </p>
            <p>
              El derecho de retracto <strong>no aplica</strong> respecto de prestaciones ya
              ejecutadas y aceptadas por el Cliente, conforme al mismo artículo 3° bis. En
              particular, se consideran prestaciones ejecutadas la generación y entrega de
              Documentos que el Cliente haya descargado, enviado o utilizado para cualquier efecto
              contractual.
            </p>
            <h3>5.2 Efectos del retracto</h3>
            <p>
              Ejercido el retracto dentro de plazo y respecto de prestaciones aún no ejecutadas,
              GoLegit devolverá las sumas pagadas dentro de los diez (10) días siguientes, por el
              mismo medio de pago, sin costo para el Cliente.
            </p>
            <h3>5.3 Cancelación sin retracto</h3>
            <p>
              Fuera del plazo de retracto, el Cliente podrá cancelar su suscripción en cualquier
              momento desde su portal o comunicándolo a <strong>soporte@golegit.cl</strong>. La
              cancelación surte efecto al término del período de facturación vigente; no habrá
              devolución proporcional respecto del período ya pagado.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2>6. Uso Aceptable y Prohibiciones</h2>
            <p>El Cliente se obliga a utilizar el Servicio de conformidad con la ley, la moral, las buenas costumbres y los presentes Términos. En particular, queda prohibido:</p>
            <ul>
              <li>Ingresar datos falsos, simulados o de personas distintas al/la Trabajador/a que efectivamente presta servicios al Cliente.</li>
              <li>Utilizar la Plataforma para generar Documentos con fines fraudulentos, simulación contractual o evasión tributaria o previsional.</li>
              <li>Eludir, intervenir o intentar vulnerar los controles de seguridad, límites de plan, cuotas o mecanismos de autenticación.</li>
              <li>Realizar ingeniería inversa, descompilar, desensamblar o intentar extraer el código fuente de la Plataforma.</li>
              <li>Automatizar el acceso mediante bots, scrapers u otros medios no autorizados por escrito por GoLegit.</li>
              <li>Revender, sublicenciar, compartir credenciales o prestar el servicio a terceros, en los términos del numeral 3.3.</li>
              <li>Enviar mensajes no solicitados, de contenido ilegal, ofensivo, difamatorio o discriminatorio a través de los canales del Servicio.</li>
              <li>Usar la Plataforma para actos contrarios al Código del Trabajo, a las Leyes N° 20.786, 21.561, 21.643, o a la normativa previsional chilena.</li>
            </ul>
            <p>
              GoLegit podrá suspender o cancelar sin aviso previo las Cuentas que incurran en
              cualquiera de estas conductas, sin perjuicio del ejercicio de las acciones legales
              correspondientes.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2>7. Obligaciones del Cliente como Empleador</h2>
            <p>
              El Cliente reconoce que es el <strong>responsable legal de la relación laboral</strong>
              que sostiene con el o la Trabajador/a, y que GoLegit únicamente facilita una
              herramienta tecnológica para su gestión. En particular:
            </p>
            <ul>
              <li>El Cliente es el <strong>responsable del tratamiento</strong> de los Datos Personales del/la Trabajador/a en los términos de la Ley N° 21.719. GoLegit actúa como <strong>encargado del tratamiento por cuenta del Cliente</strong>, conforme al numeral 3 de la Política de Privacidad.</li>
              <li>El Cliente garantiza contar con base de licitud suficiente para ingresar, modificar y compartir datos del/la Trabajador/a con GoLegit (típicamente: ejecución del contrato laboral, obligación legal laboral/previsional y consentimiento para la firma electrónica).</li>
              <li>El Cliente se obliga a informar al/la Trabajador/a sobre el uso de GoLegit y a entregarle copia de los Documentos laborales que le competen (contrato, liquidaciones, finiquito, etc.), tal como lo exige el Código del Trabajo.</li>
              <li>El Cliente es responsable de la veracidad, exactitud y oportunidad de los datos que ingresa. GoLegit no verifica la realidad material de la relación laboral: asume la información como veraz para efectos de la generación de Documentos y cálculos.</li>
              <li>El Cliente es responsable de cumplir en tiempo y forma con sus obligaciones previsionales, tributarias, de registro electrónico y cualquier otra que le imponga la legislación chilena; GoLegit genera la información preparada pero no realiza pagos ni trámites ante la Tesorería General de la República, el IPS, las AFP, las Isapres, la Inspección del Trabajo ni otros organismos, salvo que expresamente se acuerde lo contrario.</li>
              <li>El Cliente es responsable de entregar al/la Trabajador/a el <strong>Protocolo Ley Karin</strong> generado por la Plataforma, dentro de los plazos establecidos por la Ley N° 21.643.</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2>8. Firma Electrónica Simple (FES)</h2>
            <h3>8.1 Base legal</h3>
            <p>
              Los Documentos firmados a través de la Plataforma utilizan <strong>Firma Electrónica
              Simple (FES)</strong> en los términos del artículo 3° de la Ley N° 19.799. Dicha
              firma tiene valor probatorio y produce los mismos efectos jurídicos que la firma
              manuscrita, respecto de los documentos en que es legalmente admisible, salvo los
              casos expresamente excluidos por la propia ley.
            </p>

            <h3>8.2 Cadena de custodia</h3>
            <p>
              La Plataforma registra, respecto de cada firma, a lo menos: (i) identidad del firmante
              verificada por PIN <em>hashed</em> con <em>bcrypt</em>; (ii) dirección IP y momento
              temporal de la firma; (iii) hash criptográfico del Documento al momento de ser
              firmado; (iv) registro inmutable en el <em>audit log</em> mediante función de base de
              datos con privilegios de seguridad reforzada; (v) cuando corresponda, incrustación de
              firma X.509 PKCS#7 al PDF, para validación por visores estándar.
            </p>

            <h3>8.3 Verificación pública</h3>
            <p>
              Cada Documento firmado incluye un código único de verificación (formato{" "}
              <code>GL-XXXXXXXX</code>) y un enlace a <Link href="/verificar">golegit.cl/verificar</Link>,
              que permite a cualquier tercero comprobar su autenticidad.
            </p>

            <h3>8.4 Limitaciones</h3>
            <p>
              La FES ofrecida por GoLegit <strong>no constituye firma electrónica avanzada</strong>
              en los términos del artículo 2° letra g) de la Ley N° 19.799, para lo cual se
              requiere certificado emitido por prestador acreditado. Los Documentos que por su
              naturaleza requieran firma electrónica avanzada (por ejemplo, determinados actos
              específicos ante el Servicio de Impuestos Internos) deberán ser firmados por otros
              medios.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2>9. Finiquito — Alcance del Servicio y Ministro de Fe</h2>
            <p>
              La Plataforma asiste al Cliente en la <strong>elaboración del finiquito</strong> con
              los datos proporcionados, los cálculos previsionales y las indemnizaciones legales
              que procedan. Sin embargo:
            </p>
            <ul>
              <li><strong>GoLegit no actúa ni ha sido investido como ministro de fe</strong> en los términos del artículo 177 del Código del Trabajo. La condición de ministro de fe corresponde, por mandato legal, a las personas que el propio artículo 177 señala (Inspector del Trabajo, notario público, oficial del Registro Civil en comunas sin notario, secretario municipal, o presidente del sindicato correspondiente, entre otros).</li>
              <li>Para otorgar al finiquito mérito ejecutivo, el Cliente y el/la Trabajador/a deberán (a) firmarlo ante alguno de los ministros de fe indicados; o bien (b) tramitarlo a través de los servicios electrónicos habilitados por la <strong>Dirección del Trabajo</strong> (DT), en los términos y con los requisitos que dicho organismo establezca.</li>
              <li>GoLegit facilita el documento en formato PDF listo para ser suscrito o cargado al sistema electrónico de la DT, pero <strong>no reemplaza la ratificación ante ministro de fe</strong> ni asume responsabilidad por la falta u omisión de dicha ratificación.</li>
            </ul>
            <p>
              La generación del finiquito a través de la Plataforma no extingue por sí sola la
              relación laboral ni garantiza la exclusión de posteriores reclamaciones judiciales:
              el cumplimiento de las formalidades del artículo 177 CT es condición legal y es
              responsabilidad del Cliente.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2>10. Propiedad Intelectual</h2>
            <h3>10.1 Titularidad de GoLegit</h3>
            <p>
              Todo el software, código fuente, diseños, marcas, logotipos, nombres comerciales,
              documentación, plantillas, fórmulas de cálculo y demás elementos de la Plataforma
              son de propiedad exclusiva de Cubillos Lama SpA o se usan bajo licencia vigente.
              Su uso por el Cliente se restringe a la finalidad expresa del Servicio contratado y
              por el plazo de la suscripción.
            </p>
            <h3>10.2 Contenidos del Cliente</h3>
            <p>
              El Cliente conserva la titularidad sobre los datos que ingresa (datos propios, datos
              del/la Trabajador/a, documentación laboral). Por el hecho de usar el Servicio,
              concede a GoLegit una licencia <strong>no exclusiva, limitada al territorio
              nacional, gratuita y sólo para la prestación del Servicio</strong>, a efectos de
              almacenar, procesar y generar los Documentos que él mismo requiere.
            </p>
            <h3>10.3 Datos anonimizados y agregados</h3>
            <p>
              GoLegit podrá utilizar información anonimizada y/o agregada, que no permita
              identificar a persona natural alguna, con fines estadísticos, de mejora continua del
              Servicio y de producción de estudios o indicadores laborales. Esta información
              anonimizada no se considera Dato Personal.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2>11. Confidencialidad</h2>
            <p>
              Las partes se obligan a mantener la más estricta reserva respecto de la información
              no pública a la que tengan acceso con motivo del Servicio. GoLegit aplica las medidas
              técnicas y organizativas descritas en el numeral 11 de la Política de Privacidad y
              sólo comparte información con los subencargados indicados en el numeral 7 de dicha
              política, bajo cláusulas contractuales equivalentes a las aquí pactadas.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2>12. Garantías Limitadas y Exclusiones</h2>
            <h3>12.1 Servicio “tal cual”</h3>
            <p>
              GoLegit presta el Servicio <strong>“tal cual” (as is) y “según disponibilidad”
              (as available)</strong>. Sin perjuicio del esfuerzo razonable en diligencia,
              actualización y seguridad, GoLegit <strong>no garantiza</strong> que el Servicio
              esté libre de errores, interrupciones o vulnerabilidades, ni que los resultados de
              los cálculos sean adecuados para todo caso particular.
            </p>

            <h3>12.2 Dependencia de terceros</h3>
            <p>
              El Servicio depende de proveedores de infraestructura, mensajería y pagos
              (WhatsApp/Meta, Supabase, AWS, Google, Railway/Gotenberg, Resend, Mercado Pago, entre
              otros, según numeral 7 de la Política de Privacidad). GoLegit no se hace responsable
              por interrupciones, fallas o degradaciones imputables a dichos terceros.
            </p>

            <h3>12.3 Dependencia de los datos ingresados</h3>
            <p>
              La exactitud de los Documentos y cálculos generados depende en primer término de los
              datos ingresados por el Cliente. GoLegit <strong>no se hace responsable</strong> de
              errores, diferencias ni consecuencias derivadas de información inexacta, incompleta
              o desactualizada proporcionada por el Cliente o por terceros.
            </p>

            <h3>12.4 Ausencia de asesoría legal individualizada</h3>
            <p>
              El contenido, plantillas y cálculos del Servicio tienen carácter general e
              informativo. El uso del Servicio no constituye asesoría legal personalizada. El
              Cliente asume la responsabilidad de consultar a profesionales para casos
              particulares complejos o controvertidos.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2>13. Limitación de Responsabilidad</h2>
            <p>
              En la máxima medida permitida por la ley, la responsabilidad total y acumulada de
              GoLegit frente al Cliente, por cualquier causa y en cualquier período de doce (12)
              meses, se limitará al <strong>monto efectivamente pagado por el Cliente a GoLegit por
              el Servicio en los tres (3) meses inmediatamente anteriores</strong> al hecho que
              origine la responsabilidad.
            </p>
            <p>En ningún caso GoLegit responderá por:</p>
            <ul>
              <li>Daños indirectos, incidentales, consecuenciales o especiales.</li>
              <li>Lucro cesante, pérdida de oportunidad o daño moral.</li>
              <li>Pérdida o corrupción de datos imputable a errores del propio Cliente, mal uso del Servicio o ataques externos que hayan superado las medidas razonables de seguridad.</li>
              <li>Consecuencias derivadas de la aplicación o interpretación de la normativa laboral, previsional o tributaria por parte del Cliente o de terceros.</li>
              <li>Caídas, bloqueos o restricciones aplicadas por WhatsApp/Meta al canal de mensajería.</li>
              <li>Demandas, reclamos o contingencias laborales del/la Trabajador/a contra el Cliente, que no sean consecuencia directa y exclusiva de un defecto imputable al Servicio.</li>
              <li>Fuerza mayor o caso fortuito, en los términos del artículo 45 del Código Civil.</li>
            </ul>
            <p>
              Nada de lo anterior limita responsabilidades que, conforme a la legislación chilena,
              no puedan ser válidamente excluidas (dolo, culpa grave, daños a la integridad física
              de las personas, derechos irrenunciables del consumidor, etc.).
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2>14. Suspensión y Terminación</h2>
            <h3>14.1 Terminación por el Cliente</h3>
            <p>
              El Cliente puede dar por terminado el contrato en cualquier momento desde su portal
              o comunicándolo a <strong>soporte@golegit.cl</strong>, con efecto al término del
              período de facturación vigente.
            </p>
            <h3>14.2 Terminación por GoLegit</h3>
            <p>GoLegit podrá suspender o poner término al Servicio, con aviso previo razonable, cuando:</p>
            <ul>
              <li>El Cliente incumpla las obligaciones de pago o cualquier disposición de estos Términos.</li>
              <li>Exista sospecha fundada de uso fraudulento del Servicio.</li>
              <li>Por razones regulatorias, operativas o de cese del producto; en tal caso se otorgará plazo razonable para migrar los datos y Documentos.</li>
            </ul>
            <h3>14.3 Efectos de la terminación</h3>
            <p>
              Terminado el contrato, el Cliente conserva el derecho de acceder y descargar sus
              Documentos por un plazo mínimo de <strong>treinta (30) días corridos</strong>.
              Vencido dicho plazo, los datos operacionales serán eliminados según lo indicado en
              el numeral 9 de la Política de Privacidad, conservándose los Documentos con valor
              probatorio por los plazos legales de retención laboral.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2>15. Modificaciones de los Términos</h2>
            <p>
              GoLegit podrá modificar los presentes Términos para adecuarlos a cambios legales,
              operativos o del Servicio. Las modificaciones sustanciales serán comunicadas al
              Cliente con al menos <strong>quince (15) días corridos</strong> de anticipación, por
              correo electrónico y en la Plataforma. El Cliente que no esté conforme podrá
              terminar la relación conforme al numeral 14 antes de la entrada en vigor; en caso
              contrario, se entenderá que acepta las nuevas condiciones.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2>16. Legislación Aplicable y Jurisdicción</h2>
            <p>
              Los presentes Términos se rigen por las leyes de la República de Chile. Cualquier
              controversia que surja con motivo de su aplicación, interpretación o ejecución será
              sometida a los <strong>tribunales ordinarios de justicia con asiento en la ciudad de
              Santiago de Chile</strong>.
            </p>
            <p>
              Con carácter previo a toda acción judicial, las partes procurarán resolver sus
              diferencias mediante comunicación directa y de buena fe durante un plazo de treinta
              (30) días corridos. Nada en esta cláusula limita el derecho del Cliente consumidor a
              recurrir al Servicio Nacional del Consumidor (SERNAC) ni a la Agencia de Protección
              de Datos Personales en materias de su competencia.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2>17. Contacto</h2>
            <ul>
              <li><strong>Soporte general:</strong> soporte@golegit.cl</li>
              <li><strong>Asuntos legales:</strong> legal@golegit.cl</li>
              <li><strong>Protección de datos personales:</strong> dpo@golegit.cl</li>
              <li><strong>Operador:</strong> Cubillos Lama SpA · RUT 78.393.969-K · Santiago de Chile</li>
            </ul>
          </section>

          <p className="text-xs text-ink-light pt-8 border-t border-ink/10">
            Versión 1.0 · 16 de abril de 2026. Las versiones anteriores pueden solicitarse a{" "}
            <strong>legal@golegit.cl</strong>.
          </p>

        </article>
      </div>
    </main>
  );
}
