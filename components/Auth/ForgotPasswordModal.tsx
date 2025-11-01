"use client";
import { forwardRef, useImperativeHandle, RefObject, useState } from "react";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Alert } from "@heroui/alert";
import { Mail, ArrowLeft } from "lucide-react";
import type { LoginModalHandle } from "./LoginModal";
import { forgotPasswordAction } from "@/app/actions/auth";

export type ForgotPasswordModalHandle = {
  open: () => void;
  close: () => void;
};

type Props = {
  hideTrigger?: boolean;
  loginModalRef?: RefObject<LoginModalHandle>;
};

export const ForgotPasswordModal = forwardRef<ForgotPasswordModalHandle, Props>(
  ({ hideTrigger = false, loginModalRef }, ref) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState<{
      type: "warning" | "danger" | "success";
      title: string;
      description: string;
    } | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        open: onOpen,
        close: onClose,
      }),
      [onOpen, onClose]
    );

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleEmailChange = (value: string) => {
      setEmail(value);
      setAlertMessage(null); // Limpiar mensaje al escribir
      if (!value) {
        setEmailError("El correo es obligatorio");
        return;
      }
      if (!validateEmail(value)) {
        setEmailError("Por favor, ingresa un correo electrónico válido");
      } else {
        setEmailError("");
      }
    };

    const handleBackToLogin = () => {
      setEmail("");
      setEmailError("");
      setAlertMessage(null);
      onClose();
      setTimeout(() => loginModalRef?.current?.open(), 150);
    };

    const handleSubmit = async () => {
      setAlertMessage(null);

      if (!email) {
        setEmailError("El correo es obligatorio");
        setAlertMessage({
          type: "danger",
          title: "Campos incompletos",
          description: "Por favor completa todos los campos",
        });
        return;
      }

      if (!validateEmail(email)) {
        setEmailError("Por favor, ingresa un correo electrónico válido");
        setAlertMessage({
          type: "danger",
          title: "Email inválido",
          description: "Por favor, ingresa un correo electrónico válido",
        });
        return;
      }

      setIsLoading(true);

      try {
        const result = await forgotPasswordAction(email);

        if (!result.success) {
          setAlertMessage({
            type: "danger",
            title: "Error",
            description: result.message,
          });
          setIsLoading(false);
          return;
        }

        // Éxito
        setAlertMessage({
          type: "success",
          title: "¡Correo enviado!",
          description: result.message,
        });

        // Limpiar solo el email, mantener el modal abierto
        setEmail("");
        setEmailError("");
      } catch (error) {
        console.error("Error en handleSubmit:", error);
        setAlertMessage({
          type: "danger",
          title: "Error de conexión",
          description: "Error inesperado. Por favor, intenta nuevamente.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <>
        {!hideTrigger && (
          <button
            type="button"
            className="text-primary cursor-pointer hover:underline text-sm"
            onClick={onOpen}
          >
            ¿Olvidaste tu contraseña?
          </button>
        )}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            {(handleClose) => (
              <>
                <ModalHeader className="flex items-center gap-3">
                  {loginModalRef && (
                    <Button
                      isIconOnly
                      className="min-w-8 w-8 h-8"
                      size="sm"
                      variant="light"
                      onPress={handleBackToLogin}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  )}
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold">Recuperar Contraseña</h2>
                  </div>
                </ModalHeader>
                <ModalBody className="gap-4 pb-6">
                  {alertMessage && (
                    <Alert
                      color={alertMessage.type}
                      title={alertMessage.title}
                      description={alertMessage.description}
                      variant="flat"
                    />
                  )}
                  <Input
                    endContent={
                      <Mail className="text-xl text-default-400 pointer-events-none shrink-0" />
                    }
                    errorMessage={emailError}
                    isInvalid={!!emailError}
                    label="Correo Electrónico"
                    variant="bordered"
                    type="email"
                    value={email}
                    isRequired
                    autoFocus
                    onValueChange={handleEmailChange}
                  />

                  {/* Botones */}
                  <div className="flex justify-between mt-2">
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={handleClose}
                      isDisabled={isLoading}
                    >
                      Cancelar
                    </Button>
                    <Button
                      color="primary"
                      onPress={handleSubmit}
                      isLoading={isLoading}
                    >
                      Enviar
                    </Button>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
);

ForgotPasswordModal.displayName = "ForgotPasswordModal";
