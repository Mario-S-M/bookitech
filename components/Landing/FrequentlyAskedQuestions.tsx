import { Card, CardBody } from '@heroui/card'
import React from 'react'
import { title } from '../primitives'
import { Link } from '@heroui/link'
import { Button } from '@heroui/button'

export const FrequentlyAskedQuestions = () => {
  return (
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
  )
}
