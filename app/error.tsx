"use client";

import { useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100 px-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardBody className="p-8 sm:p-12 text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-danger-50 dark:bg-danger-100/10 flex items-center justify-center animate-pulse">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-danger"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              ¡Algo salió mal!
            </h1>
            <p className="text-lg text-default-600">
              Lo sentimos, hemos encontrado un problema inesperado
            </p>
          </div>

          {/* Error Message */}
          {process.env.NODE_ENV === "development" && (
            <div className="bg-default-100 dark:bg-default-50/10 rounded-lg p-4 text-left">
              <p className="text-sm font-mono text-danger break-words">
                {error.message}
              </p>
            </div>
          )}

          {/* Additional Info */}
          <p className="text-sm text-default-500">
            No te preocupes, estamos trabajando en solucionarlo. Puedes intentar
            recargar la página o volver más tarde.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              className="font-semibold"
              color="primary"
              size="lg"
              variant="shadow"
              onClick={() => reset()}
            >
              Intentar de nuevo
            </Button>
            <Button
              className="font-semibold"
              color="default"
              size="lg"
              variant="flat"
              onClick={() => (window.location.href = "/")}
            >
              Volver al inicio
            </Button>
          </div>

          {/* Decorative Element */}
          <div className="pt-6 opacity-50">
            <p className="text-xs text-default-600">
              Si el problema persiste, por favor contáctanos
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
