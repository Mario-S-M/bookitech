import { Card, CardBody, CardHeader } from '@heroui/card'
import React from 'react'
import { title } from '../primitives'

export const AboutUsSection = () => {
  return (
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
  )
}
