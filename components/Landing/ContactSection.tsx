import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import React from "react";
import { title } from "../primitives";

export const ContactSection = () => {
  return (
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
                  <h3 className="text-lg font-bold mb-2">Correo Electrónico</h3>
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
  );
};
