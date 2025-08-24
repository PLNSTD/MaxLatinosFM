import Navbar from "@/app/components/Navbar";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-gray-900 p-6">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Nosotros
        </h1>

        {/* Misión */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Misión</h2>
          <p className="text-gray-600 leading-relaxed">
            Nuestra misión es{" "}
            <strong>
              brindar a los oyentes alternativas de entretenimiento, información
              y cultura
            </strong>{" "}
            a través de una programación variada que los mantenga actualizados y
            conectados con su entorno.
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            Nos enfocamos en{" "}
            <strong>
              programas educativos, sociales, culturales, deportivos y musicales
            </strong>
            , donde los oyentes no solo disfruten del contenido, sino que
            también puedan{" "}
            <strong>aprender, reflexionar y crear una conciencia social</strong>
            . Todo esto se realiza con{" "}
            <strong>respeto, inclusión y compromiso con la diversidad</strong>.
          </p>
        </div>

        {/* Visión */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Visión</h2>
          <p className="text-gray-600 leading-relaxed">
            Nuestra visión es{" "}
            <strong>
              promover la creatividad radial y la difusión cultural
            </strong>{" "}
            mediante el uso de una{" "}
            <strong>plataforma tecnológica avanzada</strong>, alineada con las
            necesidades sociales actuales y un mundo cada vez más
            interconectado.
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            Buscamos ser <strong>un referente en innovación radiofónica</strong>
            , donde la tecnología y la cultura se unan para enriquecer la
            experiencia de nuestros oyentes.
          </p>
        </div>

        {/* Objetivos */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Objetivos
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Nuestros objetivos se centran en{" "}
            <strong>
              transmitir contenido de audio de alta calidad a través de Internet
            </strong>
            , creando una{" "}
            <strong>
              comunicación directa y personalizada con los oyentes
            </strong>
            .
          </p>

          {/* Lista de objetivos */}
          <ul className="list-disc list-inside mt-4 space-y-3 text-gray-600">
            <li>
              <strong>Comunicación interna:</strong> Las empresas pueden
              utilizar nuestras emisoras online para{" "}
              <strong>transmitir mensajes corporativos</strong>, actualizaciones
              y reconocimientos a sus empleados, fomentando un ambiente de{" "}
              <strong>información clara y motivadora</strong>.
            </li>
            <li>
              <strong>Promoción de productos y servicios:</strong> La radio
              online se convierte en un{" "}
              <strong>canal efectivo para anuncios y promociones</strong>,
              ayudando a las marcas a llegar a su público de manera{" "}
              <strong>directa y atractiva</strong>.
            </li>
            <li>
              <strong>Segmentación de audiencia:</strong> Es posible{" "}
              <strong>llegar a audiencias específicas</strong> con contenido
              adaptado a sus intereses, creando comunidades en torno a temas
              comunes y generando un vínculo más cercano con los oyentes.
            </li>
            <li>
              <strong>Mayor interacción:</strong> Nuestras emisoras facilitan la{" "}
              <strong>interacción constante</strong> entre la radio y los
              oyentes, permitiendo{" "}
              <strong>comentarios, solicitudes y participación activa</strong>.
            </li>
            <li>
              <strong>Entretenimiento y educación:</strong> Ofrecemos una{" "}
              <strong>amplia variedad de contenidos</strong>, desde programas
              musicales hasta charlas informativas y educativas, logrando un
              equilibrio entre{" "}
              <strong>diversión, aprendizaje y desarrollo personal</strong>.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
