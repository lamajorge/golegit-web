import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — GoLegit",
  robots: { index: false },
};

export default function PrivacidadPage() {
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
          Política de Privacidad
        </h1>
        <p className="text-sm text-ink-light mb-10">
          Última actualización: 16 de abril de 2026 · Versión 1.0
        </p>

        <article className="prose prose-sm max-w-none text-ink-muted space-y-4 prose-headings:text-ink prose-headings:font-medium prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-strong:text-ink prose-a:text-brand-600 prose-table:text-xs prose-th:bg-ink/5 prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1 prose-td:align-top prose-td:border-b prose-td:border-ink/5">

          <p>
            La presente Política de Privacidad (en adelante, la <strong>“Política”</strong>)
            describe cómo <strong>Cubillos Lama SpA</strong>, RUT <strong>78.393.969-K</strong>,
            con domicilio en Santiago de Chile (en adelante, <strong>“GoLegit”</strong> o el
            <strong> “Operador”</strong>), trata los datos personales de quienes utilizan la
            plataforma <strong>GoLegit</strong>. Esta Política se integra a los{" "}
            <Link href="/terminos">Términos y Condiciones del Servicio</Link> y se rige por la
            legislación chilena aplicable.
          </p>

          {/* 1 */}
          <section>
            <h2>1. Responsable del Tratamiento y Delegado de Protección de Datos</h2>

            <h3>1.1 Responsable</h3>
            <p>
              El responsable del tratamiento de los Datos Personales es{" "}
              <strong>Cubillos Lama SpA</strong> (RUT 78.393.969-K), con domicilio en Santiago de
              Chile, operadora del servicio GoLegit.
            </p>

            <h3>1.2 Delegado de Protección de Datos (DPO)</h3>
            <p>
              GoLegit ha designado un <strong>Delegado de Protección de Datos</strong>, a cuya
              función pueden dirigirse las consultas, solicitudes de ejercicio de derechos y
              comunicaciones relativas al tratamiento de datos personales, al correo{" "}
              <strong>dpo@golegit.cl</strong>. Su identidad se encuentra registrada internamente y
              puede ser informada a solicitud fundada de autoridad competente.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2>2. Marco Normativo Aplicable</h2>
            <p>La presente Política se ajusta a la normativa chilena vigente, en particular:</p>
            <ul>
              <li><strong>Ley N° 19.628</strong> sobre protección de la vida privada (vigente hasta la entrada en régimen pleno de la Ley N° 21.719).</li>
              <li><strong>Ley N° 21.719</strong> que regula la protección y el tratamiento de los datos personales y crea la Agencia de Protección de Datos Personales, publicada el 13 de diciembre de 2024, cuyas disposiciones entran en vigor de manera gradual y cuyo régimen sustantivo pleno comienza a regir el <strong>1 de diciembre de 2026</strong>. GoLegit ha adoptado las obligaciones que impone esta ley con carácter anticipado.</li>
              <li><strong>Ley N° 19.799</strong> sobre documentos electrónicos, firma electrónica y servicios de certificación de dicha firma.</li>
              <li><strong>Ley N° 19.496</strong> sobre protección de los derechos de los consumidores.</li>
              <li><strong>Ley N° 21.643</strong> que regula la prevención, investigación y sanción del acoso laboral, sexual o de violencia en el trabajo (<em>“Ley Karin”</em>).</li>
              <li><strong>Código del Trabajo</strong> y normas previsionales y tributarias relacionadas.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2>3. Rol Dual: Responsable y Encargado del Tratamiento</h2>
            <p>
              GoLegit asume una doble posición respecto de los Datos Personales que trata, en los
              términos del artículo 2° letras h) e i) de la Ley N° 21.719:
            </p>

            <h3>3.1 Como Responsable del Tratamiento</h3>
            <p>
              Respecto de los datos del <strong>Cliente-empleador</strong> (nombre, RUT, correo,
              teléfono, domicilio, datos de suscripción y pago), GoLegit determina los fines y los
              medios del tratamiento y es, por tanto, <strong>responsable</strong> directo.
            </p>

            <h3>3.2 Como Encargado del Tratamiento</h3>
            <p>
              Respecto de los datos del o la <strong>Trabajador/a</strong> (nombre, RUT,
              nacionalidad, fecha de nacimiento, domicilio, remuneración, afiliación previsional,
              licencias, vacaciones, datos biométricos y demás), GoLegit actúa como{" "}
              <strong>encargado del tratamiento por cuenta del Cliente</strong>, quien es el
              responsable del tratamiento en su calidad de empleador. GoLegit procesa estos datos:
            </p>
            <ul>
              <li>Exclusivamente conforme a las instrucciones del Cliente y a las finalidades previstas en estos documentos.</li>
              <li>Sin transferirlos a terceros distintos de los subencargados indicados en el numeral 7, salvo obligación legal.</li>
              <li>Con las medidas de seguridad descritas en el numeral 11.</li>
              <li>Devolviendo, bloqueando o eliminando los datos al término del servicio, según lo que instruya el Cliente y lo que imponga la ley.</li>
            </ul>
            <p>
              La presente Política y los Términos y Condiciones constituyen, en lo pertinente, el
              acuerdo de tratamiento de datos entre el Cliente y GoLegit (<em>Data Processing
              Agreement</em>).
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2>4. Datos Personales Tratados</h2>

            <h3>4.1 Datos del Cliente-empleador</h3>
            <ul>
              <li>Nombre completo, RUT, correo electrónico, número de teléfono móvil, domicilio.</li>
              <li>Datos de autenticación: <em>hash bcrypt</em> de PIN de firma, tokens de sesión.</li>
              <li>Datos de suscripción y pago: plan contratado, identificador de suscripción de Mercado Pago, fechas de activación, renovación y término. <strong>GoLegit no almacena datos completos de tarjetas de crédito o débito.</strong></li>
              <li>Metadatos de uso: fecha y hora de mensajes, paso del flujo actual, acciones realizadas.</li>
            </ul>

            <h3>4.2 Datos del o la Trabajador/a</h3>
            <ul>
              <li><strong>Identificación:</strong> nombre completo, RUT, nacionalidad, fecha de nacimiento, domicilio, correo electrónico, número de teléfono.</li>
              <li><strong>Datos laborales:</strong> modalidad (puertas adentro/afuera), tipo de contrato (indefinido/plazo fijo), jornada, funciones, fecha de inicio y término, remuneración, horas extras, beneficios no imponibles, forma de pago.</li>
              <li><strong>Datos previsionales:</strong> AFP, sistema de salud, plan Isapre (si aplica), sistema de pensiones, cargas familiares.</li>
              <li><strong>Datos de eventos laborales:</strong> ausencias, permisos, licencias médicas, amonestaciones, vacaciones, días especiales trabajados.</li>
              <li><strong>Datos de firma electrónica:</strong> <em>hash bcrypt</em> de PIN, IP y timestamp de firma, evidencia de consentimiento.</li>
            </ul>

            <h3>4.3 Datos sensibles</h3>
            <p>
              A diferencia de otros servicios que declaran no recopilar datos sensibles, GoLegit
              <strong> sí trata</strong> ciertas categorías que la Ley N° 21.719 considera sensibles
              o especialmente protegidas, debido a la naturaleza del Servicio:
            </p>
            <ul>
              <li><strong>Datos biométricos:</strong> imagen de cédula de identidad y fotografía facial (selfie) utilizadas para verificación de identidad mediante OCR y comparación de rostro. Se tratan con consentimiento explícito previo, se almacenan en contenedor privado y se eliminan según el numeral 9.</li>
              <li><strong>Datos de salud:</strong> licencias médicas, tipo de licencia (enfermedad común, accidente, maternidad, paternidad), fechas y días subsidiados. Se tratan al solo objeto de generar la liquidación y los registros laborales exigidos por ley.</li>
              <li><strong>Datos económicos detallados:</strong> remuneraciones, descuentos, cotizaciones y cargas familiares.</li>
            </ul>
            <p>
              Los datos sensibles son tratados con medidas reforzadas (cifrado, acceso restringido,
              evaluación de impacto previa en los términos del artículo 15 quáter de la Ley N°
              21.719) y únicamente para las finalidades descritas en el numeral 5.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2>5. Finalidades del Tratamiento</h2>
            <p>GoLegit trata los Datos Personales para las siguientes finalidades:</p>
            <ul>
              <li><strong>Prestación del Servicio:</strong> registrar, calcular, generar y entregar Documentos laborales al Cliente y al/la Trabajador/a.</li>
              <li><strong>Firma electrónica FES:</strong> habilitar y registrar la firma de Documentos conforme a la Ley N° 19.799, incluyendo el mantenimiento de la cadena de custodia.</li>
              <li><strong>Verificación de identidad:</strong> mediante biometría voluntaria para habilitar la firma electrónica del/la Trabajador/a y prevenir fraudes.</li>
              <li><strong>Comunicaciones operacionales:</strong> envío de notificaciones, recordatorios, alertas de vencimientos, confirmaciones y documentos por WhatsApp y correo electrónico.</li>
              <li><strong>Facturación y cobro:</strong> gestión de la suscripción, emisión de documentos tributarios y procesamiento de pagos a través de Mercado Pago.</li>
              <li><strong>Soporte y atención:</strong> responder consultas, resolver incidencias técnicas y atender reclamos.</li>
              <li><strong>Seguridad y prevención de fraude:</strong> detección de usos anómalos, bloqueo de cuentas comprometidas, protección frente a intentos de intrusión.</li>
              <li><strong>Cumplimiento de obligaciones legales:</strong> retención de documentos y registros exigidos por la legislación laboral, previsional y tributaria; atención de requerimientos de autoridad competente.</li>
              <li><strong>Mejora continua del Servicio:</strong> análisis técnico de uso y rendimiento. Este análisis se realiza en lo posible con datos <em>anonimizados y agregados</em>.</li>
            </ul>
            <p>
              GoLegit <strong>no utiliza</strong> los datos del/la Trabajador/a para fines
              publicitarios ni los cede a terceros con fines comerciales.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2>6. Bases de Licitud del Tratamiento</h2>
            <p>
              Cada tratamiento se apoya en una o más de las bases de licitud contempladas en el
              artículo 13 de la Ley N° 21.719:
            </p>
            <ul>
              <li><strong>Consentimiento libre, informado, específico e inequívoco</strong> del titular, prestado de forma expresa (por ejemplo, para verificación biométrica y uso de datos con fines promocionales del propio Servicio).</li>
              <li><strong>Ejecución de un contrato</strong> del que el titular es parte, como la relación contractual empleador–GoLegit (suscripción) y el contrato laboral empleador–Trabajador/a.</li>
              <li><strong>Cumplimiento de obligaciones legales</strong> aplicables a GoLegit o al Cliente, tales como la retención de registros laborales, previsionales y tributarios, la emisión de documentos tributarios y la atención de requerimientos de autoridad.</li>
              <li><strong>Interés legítimo</strong> de GoLegit o de un tercero, tras ponderación documentada frente a los derechos del titular. Esta base se aplica principalmente a: seguridad del sistema, prevención del fraude y anti-abuso de la plataforma.</li>
              <li><strong>Protección de intereses vitales</strong> del titular, en situaciones de emergencia.</li>
            </ul>
            <p>
              El consentimiento puede ser revocado en cualquier momento, sin efecto retroactivo,
              conforme al procedimiento del numeral 10. La revocación del consentimiento no afecta
              tratamientos necesarios para ejecutar el contrato o para cumplir una obligación
              legal.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2>7. Destinatarios y Subencargados del Tratamiento</h2>
            <p>
              GoLegit sólo comparte Datos Personales con los subencargados necesarios para la
              prestación del Servicio, bajo cláusulas contractuales que exigen medidas equivalentes
              de protección. La relación de subencargados vigentes es la siguiente:
            </p>

            <div className="not-prose overflow-x-auto my-4">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="text-left">Subencargado</th>
                    <th className="text-left">Ubicación</th>
                    <th className="text-left">Finalidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Supabase Inc.</strong></td><td>Brasil (sa-east-1)</td><td>Base de datos, autenticación, almacenamiento de archivos y funciones de servidor.</td></tr>
                  <tr><td><strong>Amazon Web Services, Inc.</strong></td><td>Estados Unidos</td><td>Comparación biométrica facial (AWS Rekognition) para verificación de identidad.</td></tr>
                  <tr><td><strong>Google LLC</strong></td><td>Estados Unidos / global</td><td>Reconocimiento óptico (OCR) de cédula de identidad a través de Cloud Vision API.</td></tr>
                  <tr><td><strong>Railway Corp.</strong> (Gotenberg)</td><td>Estados Unidos</td><td>Generación de documentos PDF a partir de plantillas HTML.</td></tr>
                  <tr><td><strong>Resend, Inc.</strong></td><td>Estados Unidos</td><td>Envío de correos electrónicos transaccionales (firma, recuperación, notificaciones).</td></tr>
                  <tr><td><strong>MercadoLibre Chile Ltda.</strong> (Mercado Pago)</td><td>Chile / región LATAM</td><td>Procesamiento de pagos y suscripciones.</td></tr>
                  <tr><td><strong>Meta Platforms, Inc.</strong> (WhatsApp Cloud API)</td><td>Estados Unidos</td><td>Canal oficial de mensajería con el Cliente y el/la Trabajador/a.</td></tr>
                  <tr><td><strong>Vercel, Inc.</strong></td><td>Estados Unidos</td><td>Alojamiento de los portales web (landing, portal empleador/trabajador/a, panel interno).</td></tr>
                </tbody>
              </table>
            </div>

            <p>
              GoLegit podrá comunicar Datos Personales a <strong>autoridades públicas</strong>{" "}
              (tribunales, Agencia de Protección de Datos Personales, Dirección del Trabajo,
              Servicio de Impuestos Internos, Fiscalía, entre otros) cuando exista una obligación
              legal o requerimiento fundado. La lista de subencargados podrá ser actualizada;
              los cambios se comunicarán con la anticipación razonable a través de la Plataforma.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2>8. Transferencias Internacionales de Datos</h2>
            <p>
              Dado el uso de los subencargados indicados en el numeral 7, parte de los Datos
              Personales es transferida y procesada fuera de Chile, en particular a Brasil y a
              Estados Unidos. Dichas transferencias se realizan sobre la base de:
            </p>
            <ul>
              <li><strong>Cláusulas contractuales</strong> con los proveedores, que imponen estándares de protección equivalentes a la legislación chilena (medidas técnicas de seguridad, obligación de confidencialidad, notificación de incidentes, limitación de finalidad, asistencia en el ejercicio de derechos).</li>
              <li><strong>Necesidad para la ejecución del contrato</strong> entre el titular y GoLegit.</li>
              <li>Cuando corresponda, <strong>consentimiento específico e informado</strong> del titular.</li>
            </ul>
            <p>
              GoLegit evalúa periódicamente la idoneidad de los países de destino y las medidas
              aplicadas por sus subencargados, y adoptará garantías adicionales cuando la Agencia
              dicte normativas específicas sobre la materia.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2>9. Plazos de Conservación</h2>
            <p>
              GoLegit conserva los Datos Personales sólo durante el tiempo estrictamente necesario
              para cumplir las finalidades para las que fueron recolectados, salvo que exista una
              obligación legal de conservación mayor. La regla general es la siguiente:
            </p>

            <div className="not-prose overflow-x-auto my-4">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="text-left">Categoría de datos</th>
                    <th className="text-left">Plazo de conservación</th>
                    <th className="text-left">Base</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Datos de cuenta del Cliente (identificación, contacto, suscripción).</td>
                    <td>Vigencia de la cuenta + 30 días corridos tras la cancelación.</td>
                    <td>Minimización · Ley 21.719.</td>
                  </tr>
                  <tr>
                    <td>Documentos laborales firmados (contrato, anexo, liquidación, finiquito, carta de aviso, amonestaciones, protocolo Ley Karin, certificados).</td>
                    <td>Cinco (5) años desde el término de la relación laboral, y hasta diez (10) años para aquellos documentos expuestos a la prescripción de acciones laborales.</td>
                    <td>Artículos 31 y 510 del Código del Trabajo.</td>
                  </tr>
                  <tr>
                    <td>Evidencia biométrica (imagen de cédula y selfie) y evidencia de consentimiento.</td>
                    <td>Duración del vínculo contractual + 5 años, o hasta que el titular solicite su eliminación conforme al numeral 10.</td>
                    <td>Ley 21.719 Art. 2 lit. g · retención probatoria.</td>
                  </tr>
                  <tr>
                    <td><em>Audit log</em> de firmas y acciones críticas.</td>
                    <td>Cinco (5) años, en formato inmutable.</td>
                    <td>Art. 31 CT · deber de rendición de cuentas Ley 21.719.</td>
                  </tr>
                  <tr>
                    <td>Sesiones de conversación en WhatsApp.</td>
                    <td>Eliminación automática a los 30 días de inactividad.</td>
                    <td>Principio de minimización.</td>
                  </tr>
                  <tr>
                    <td>Eventos de conversación y logs operacionales.</td>
                    <td>Hasta 90 días corridos.</td>
                    <td>Principio de minimización.</td>
                  </tr>
                  <tr>
                    <td>Datos de facturación y pagos.</td>
                    <td>Seis (6) años.</td>
                    <td>Artículo 17 del Código Tributario.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Vencidos los plazos, los datos son eliminados o anonimizados de forma irreversible.
              La información anonimizada y agregada podrá conservarse indefinidamente con fines
              estadísticos y de mejora del Servicio.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2>10. Derechos del Titular (ARCOPOL)</h2>
            <p>
              Todo titular de Datos Personales puede ejercer, en los términos de la Ley N° 21.719,
              los siguientes derechos:
            </p>
            <ol>
              <li><strong>Acceso:</strong> solicitar y obtener información sobre qué datos se están tratando, con qué finalidad y a quién se comunican.</li>
              <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos, incompletos o desactualizados.</li>
              <li><strong>Cancelación o supresión:</strong> solicitar la eliminación cuando los datos ya no sean necesarios, cuando se haya retirado el consentimiento o cuando hayan sido tratados ilícitamente, sin perjuicio de los plazos legales de conservación.</li>
              <li><strong>Oposición:</strong> oponerse al tratamiento por motivos particulares, incluyendo el rechazo a decisiones automatizadas y al marketing directo.</li>
              <li><strong>Portabilidad:</strong> recibir los datos que le conciernen en formato estructurado y de uso común, o solicitar su transferencia a otro responsable.</li>
              <li><strong>Bloqueo y restricción del tratamiento:</strong> suspender temporalmente el tratamiento mientras se resuelve una controversia sobre su exactitud o licitud.</li>
            </ol>

            <h3>10.1 Procedimiento</h3>
            <p>Las solicitudes pueden presentarse por dos vías:</p>
            <ul>
              <li>Correo electrónico a <strong>dpo@golegit.cl</strong>, desde el correo registrado en la cuenta o acompañando copia del documento de identidad.</li>
              <li>Mediante las opciones disponibles en el portal web del Cliente o del/la Trabajador/a.</li>
            </ul>
            <p>
              GoLegit responderá la solicitud en un plazo máximo de <strong>quince (15) días
              hábiles</strong>, prorrogable fundadamente, conforme al artículo 16 ter de la Ley N°
              21.719. La atención del derecho es gratuita, salvo los casos de solicitudes
              manifiestamente infundadas o excesivas, en que podrá exigirse una contraprestación
              razonable.
            </p>

            <h3>10.2 Reclamación ante la Agencia</h3>
            <p>
              Si el titular estima que su solicitud no ha sido satisfecha adecuadamente, podrá
              reclamar ante la <strong>Agencia de Protección de Datos Personales</strong>, en los
              términos que dicha autoridad disponga.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2>11. Medidas de Seguridad</h2>
            <p>
              GoLegit adopta medidas técnicas y organizativas razonables y apropiadas al estado de
              la técnica, el costo de la aplicación y los riesgos del tratamiento, con el fin de
              proteger los Datos Personales frente a accesos no autorizados, pérdida, alteración o
              divulgación indebida. Entre ellas:
            </p>
            <ul>
              <li>Cifrado en tránsito (TLS) y cifrado en reposo para los datos almacenados en la base de datos y en el almacenamiento de archivos.</li>
              <li>Autenticación multifactor mediante <em>magic link</em> y PIN, con verificación <em>bcrypt</em> y bloqueo tras 5 intentos fallidos durante 15 minutos.</li>
              <li>Control de acceso por roles basado en políticas de <em>Row-Level Security</em> en la base de datos.</li>
              <li>Registro inmutable (<em>audit log</em>) de las acciones críticas, con triggers de seguridad reforzada.</li>
              <li>Segregación de ambientes (desarrollo, QA y producción) y uso de claves mínimas necesarias por componente.</li>
              <li>Gestión de secretos en bóvedas cifradas de los proveedores de infraestructura.</li>
              <li>Evaluación de impacto previa al tratamiento de datos biométricos y sensibles.</li>
              <li>Capacitación del personal con acceso a datos, bajo obligación contractual de confidencialidad.</li>
              <li>Revisiones de seguridad periódicas y planes de respuesta a incidentes.</li>
            </ul>
            <p>
              Ninguna medida puede ofrecer seguridad absoluta. GoLegit actualiza sus controles de
              manera continua conforme evoluciona el estado de la técnica y el marco normativo.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2>12. Notificación de Violaciones de Seguridad</h2>
            <p>
              En caso de detectar una violación de seguridad que pueda afectar los Datos Personales
              y representar un riesgo para los derechos de los titulares, GoLegit:
            </p>
            <ul>
              <li>Notificará a la <strong>Agencia de Protección de Datos Personales</strong>, sin dilación indebida y, cuando sea posible, a más tardar dentro de las <strong>72 horas</strong> de haber tenido conocimiento del incidente, de conformidad con el artículo 32 de la Ley N° 21.719.</li>
              <li>Notificará a los titulares afectados <strong>sin dilación indebida</strong> cuando la violación sea susceptible de producirles un perjuicio significativo, incluyendo las medidas adoptadas y las recomendaciones para mitigar los efectos.</li>
              <li>Registrará internamente todo incidente, independientemente de la obligación de notificación, para fines de rendición de cuentas y mejora continua.</li>
            </ul>
          </section>

          {/* 13 */}
          <section>
            <h2>13. Menores de Edad</h2>
            <p>
              El Servicio está dirigido a empleadores adultos y a trabajadores/as de casa
              particular mayores de edad. GoLegit <strong>no recolecta intencionadamente</strong>
              datos personales de menores de 18 años. De detectar que se han ingresado datos de un
              menor sin base legal, GoLegit eliminará dicha información a la mayor brevedad.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2>14. Cookies y Tecnologías Similares</h2>
            <p>
              Los sitios web de GoLegit (<Link href="/">golegit.cl</Link>, <em>app.golegit.cl</em>,{" "}
              <em>go.golegit.cl</em> y el panel interno) pueden utilizar cookies técnicas y de
              rendimiento estrictamente necesarias para el funcionamiento de las sesiones, la
              autenticación y la protección frente a abusos. GoLegit no utiliza cookies de
              publicidad comportamental ni cede los registros de navegación a terceros con fines
              comerciales. El usuario puede gestionar o eliminar las cookies desde la
              configuración de su navegador, entendiendo que su desactivación puede limitar
              ciertas funcionalidades.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2>15. Actualizaciones de la Política</h2>
            <p>
              Esta Política es revisada al menos una vez al año y, en todo caso, cada vez que se
              produzcan cambios normativos, operativos o de subencargados que lo requieran. Las
              modificaciones sustanciales serán comunicadas con al menos <strong>quince (15) días
              corridos</strong> de anticipación al Cliente, por correo electrónico y en la
              Plataforma. La versión vigente estará siempre disponible en{" "}
              <Link href="/privacidad">golegit.cl/privacidad</Link>. Las versiones anteriores
              podrán solicitarse al DPO.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2>16. Contacto</h2>
            <ul>
              <li><strong>Delegado de Protección de Datos:</strong> dpo@golegit.cl</li>
              <li><strong>Asuntos legales:</strong> legal@golegit.cl</li>
              <li><strong>Soporte general:</strong> soporte@golegit.cl</li>
              <li><strong>Responsable:</strong> Cubillos Lama SpA · RUT 78.393.969-K · Santiago de Chile</li>
              <li><strong>Agencia de Protección de Datos Personales:</strong> instancia de reclamación conforme a la Ley N° 21.719.</li>
            </ul>
          </section>

          <p className="text-xs text-ink-light pt-8 border-t border-ink/10">
            Versión 1.0 · 16 de abril de 2026.
          </p>

        </article>
      </div>
    </main>
  );
}
