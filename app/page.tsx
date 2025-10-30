import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-6 py-20 md:py-32 px-6">
        <div className="max-w-4xl text-center space-y-6">
          <h1 className={title({ size: "lg" })}>Bookitech</h1>
          <p
            className={subtitle({
              class: "text-lg md:text-xl max-w-2xl mx-auto",
            })}
          >
            Tu librería digital de confianza. Descubre, compra y disfruta de
            miles de libros desde la comodidad de tu hogar.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              className="font-semibold px-8"
            >
              Iniciar Sesión
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="font-semibold px-8"
              as={Link}
              href="#contacto"
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </section>

      <Divider className="max-w-6xl mx-auto" />

      {/* Conócenos Section */}
      <section id="conocenos" className="scroll-mt-28 py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={title({ size: "md" })}>Conócenos</h2>
            <p className="text-default-600 mt-4 text-lg max-w-3xl mx-auto">
              Somos más que una librería digital, somos tu compañero en el viaje
              del conocimiento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none bg-default-100/50 dark:bg-default-50/10">
              <CardHeader className="flex-col items-start px-6 pt-6 pb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Amplio Catálogo</h3>
              </CardHeader>
              <CardBody className="px-6 pb-6">
                <p className="text-default-600">
                  Miles de títulos en diversos géneros: ficción, no ficción,
                  académicos, técnicos y mucho más. Encuentra el libro perfecto
                  para ti.
                </p>
              </CardBody>
            </Card>

            <Card className="border-none bg-default-100/50 dark:bg-default-50/10">
              <CardHeader className="flex-col items-start px-6 pt-6 pb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Entrega Inmediata</h3>
              </CardHeader>
              <CardBody className="px-6 pb-6">
                <p className="text-default-600">
                  Accede a tus libros al instante. Sin esperas, sin envíos.
                  Comienza a leer en el momento que realizas tu compra.
                </p>
              </CardBody>
            </Card>

            <Card className="border-none bg-default-100/50 dark:bg-default-50/10">
              <CardHeader className="flex-col items-start px-6 pt-6 pb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Compra Segura</h3>
              </CardHeader>
              <CardBody className="px-6 pb-6">
                <p className="text-default-600">
                  Plataforma segura con encriptación de datos. Múltiples métodos
                  de pago para tu comodidad y tranquilidad.
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-default-100 to-default-50 dark:from-default-100/20 dark:to-default-50/10">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">Nuestra Misión</h3>
              <p className="text-default-700 text-lg leading-relaxed">
                Democratizar el acceso al conocimiento y la cultura, ofreciendo
                una plataforma intuitiva y accesible donde cada persona pueda
                encontrar los libros que enriquezcan su vida personal y
                profesional. Creemos en el poder transformador de la lectura.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider className="max-w-6xl mx-auto" />

      {/* Contacto Section */}
      <section
        id="contacto"
        className="scroll-mt-28 py-20 md:py-32 px-6 bg-default-50/50 dark:bg-default-100/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={title({ size: "md" })}>Contacto</h2>
            <p className="text-default-600 mt-4 text-lg max-w-3xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos a través de cualquiera de
              nuestros canales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-none shadow-md">
              <CardBody className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">
                      Correo Electrónico
                    </h3>
                    <p className="text-default-600 mb-3">
                      Escríbenos y te responderemos en menos de 24 horas.
                    </p>
                    <Link
                      href="mailto:contacto@bookitech.com"
                      className="text-primary font-semibold hover:underline"
                    >
                      contacto@bookitech.com
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border-none shadow-md">
              <CardBody className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">Chat en Vivo</h3>
                    <p className="text-default-600 mb-3">
                      Soporte instantáneo de lunes a viernes, 9:00 AM - 6:00 PM.
                    </p>
                    <Button color="primary" variant="flat" size="sm">
                      Iniciar Chat
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border-none shadow-md">
              <CardBody className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">Teléfono</h3>
                    <p className="text-default-600 mb-3">
                      Llámanos para atención personalizada y asesoría.
                    </p>
                    <Link
                      href="tel:+523311234567"
                      className="text-primary font-semibold hover:underline"
                    >
                      +52 33 1123 4567
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border-none shadow-md">
              <CardBody className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">Redes Sociales</h3>
                    <p className="text-default-600 mb-3">
                      Síguenos para novedades, ofertas y recomendaciones.
                    </p>
                    <div className="flex gap-3">
                      <Link href="#" className="text-primary hover:opacity-80">
                        Facebook
                      </Link>
                      <span className="text-default-400">•</span>
                      <Link href="#" className="text-primary hover:opacity-80">
                        Instagram
                      </Link>
                      <span className="text-default-400">•</span>
                      <Link href="#" className="text-primary hover:opacity-80">
                        Twitter
                      </Link>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <Divider className="max-w-6xl mx-auto" />

      {/* Preguntas Frecuentes Section */}
      <section id="preguntas" className="scroll-mt-28 py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={title({ size: "md" })}>Preguntas Frecuentes</h2>
            <p className="text-default-600 mt-4 text-lg">
              Encuentra respuestas rápidas a las dudas más comunes sobre nuestro
              servicio.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-default-900">
                  ¿Cómo puedo comprar un libro?
                </h3>
                <p className="text-default-600 leading-relaxed">
                  Es muy sencillo. Navega por nuestro catálogo, selecciona el
                  libro que desees, agrégalo al carrito y procede al pago. Una
                  vez completada la compra, tendrás acceso inmediato para leer o
                  descargar tu libro en formato digital.
                </p>
              </CardBody>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-default-900">
                  ¿Qué métodos de pago aceptan?
                </h3>
                <p className="text-default-600 leading-relaxed">
                  Aceptamos tarjetas de crédito y débito (Visa, MasterCard,
                  American Express), PayPal, transferencias bancarias y pagos en
                  OXXO. Todos los pagos están protegidos con encriptación de
                  última generación.
                </p>
              </CardBody>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-default-900">
                  ¿Puedo leer los libros en cualquier dispositivo?
                </h3>
                <p className="text-default-600 leading-relaxed">
                  ¡Por supuesto! Nuestros libros digitales son compatibles con
                  computadoras, tablets, smartphones y lectores de e-books.
                  Puedes leer desde cualquier dispositivo con tu cuenta de
                  Bookitech y sincronizar tu progreso.
                </p>
              </CardBody>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-default-900">
                  ¿Ofrecen reembolsos?
                </h3>
                <p className="text-default-600 leading-relaxed">
                  Sí, ofrecemos reembolso completo dentro de las primeras 48
                  horas de la compra, siempre y cuando no hayas descargado o
                  leído más del 10% del contenido. Queremos que estés
                  completamente satisfecho con tu compra.
                </p>
              </CardBody>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-default-900">
                  ¿Tienen libros en otros idiomas?
                </h3>
                <p className="text-default-600 leading-relaxed">
                  Sí, nuestro catálogo incluye libros en español, inglés,
                  francés, alemán y portugués. Puedes filtrar por idioma en la
                  búsqueda para encontrar exactamente lo que necesitas.
                </p>
              </CardBody>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-default-900">
                  ¿Necesito crear una cuenta para comprar?
                </h3>
                <p className="text-default-600 leading-relaxed">
                  Sí, necesitas crear una cuenta gratuita. Esto te permite
                  acceder a tu biblioteca personal, gestionar tus compras,
                  guardar favoritos y recibir recomendaciones personalizadas. El
                  registro toma menos de un minuto.
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="mt-12 text-center p-8 rounded-2xl bg-default-100/50 dark:bg-default-50/10">
            <h3 className="text-xl font-bold mb-3">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-default-600 mb-6">
              Nuestro equipo de soporte está listo para ayudarte con cualquier
              duda adicional.
            </p>
            <Button color="primary" variant="shadow" as={Link} href="#contacto">
              Contactar Soporte
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
