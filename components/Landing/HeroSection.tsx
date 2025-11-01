import { Button } from '@heroui/button'
import React from 'react'
import { subtitle, title } from '../primitives'
import { Link } from '@heroui/link'
import { LoginModal } from '../Auth/LoginModal'

export const HeroSection = () => {
  return (
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
            <LoginModal/>
            <Button
              variant="bordered"
              as={Link}
              href="#contacto"
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </section>
  )
}
