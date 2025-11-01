"use client";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

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
import { ArrowLeft, ShieldCheck } from "lucide-react";
import type { LoginModalHandle } from "./LoginModal";
import { verifyAccountAction } from "@/app/actions/auth";
import { InputOtp } from "@heroui/react";

export type VerifyAccountModalHandle = {
  open: () => void;
  close: () => void;
};

type Props = {
  hideTrigger?: boolean;
  loginModalRef?: React.RefObject<LoginModalHandle>;
  userId?: number | string;
};

export const VerifyAccount = forwardRef<VerifyAccountModalHandle, Props>(
  ({ hideTrigger = true, loginModalRef, userId }, ref) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [codigo, setCodigo] = useState("");
    const [codigoError, setCodigoError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState<{
      type: "warning" | "danger" | "success";
      title: string;
      description: string;
    } | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          // Limpiar estado al abrir
          setCodigo("");
          setCodigoError("");
          setAlertMessage(null);
          onOpen();
        },
        close: onClose,
      }),
      [onOpen, onClose]
    );

    const handleBackToLogin = () => {
      onClose();
      setTimeout(() => {
        loginModalRef?.current?.reset?.();
        loginModalRef?.current?.open();
      }, 150);
    };

    const handleCodigoChange = async (value: string) => {
      // Solo dígitos, exactamente hasta 6
      const digits = value.replace(/\D/g, "").slice(0, 6);
      setCodigo(digits);
      if (!digits) {
        setCodigoError("El código es obligatorio");
      } else {
        setCodigoError("");
      }

      // Auto-enviar cuando complete los 6 dígitos
      if (digits.length === 6 && !isLoading) {
        await handleVerificar(digits);
      }
    };

    const handleVerificar = async (codeOverride?: string) => {
      setAlertMessage(null);

      const idNum =
        typeof userId === "string" ? parseInt(userId, 10) : Number(userId);
      if (!idNum || Number.isNaN(idNum)) {
        setAlertMessage({
          type: "danger",
          title: "Falta información",
          description:
            "No se encontró el ID de usuario para la verificación. Intenta iniciar sesión nuevamente.",
        });
        return;
      }

      const codeToUse = (codeOverride ?? codigo) || "";
      if (!codeToUse) {
        setCodigoError("El código es obligatorio");
        setAlertMessage({
          type: "danger",
          title: "Campos incompletos",
          description: "Por favor completa todos los campos",
        });
        return;
      }
      if (codeToUse.length !== 6) {
        setCodigoError("El código debe tener 6 dígitos");
        return;
      }

      setIsLoading(true);
      try {
        const codigoNum = parseInt(codeToUse, 10);
        const resp = await verifyAccountAction(idNum, codigoNum);
        if (!resp.success) {
          setAlertMessage({
            type: "danger",
            title: "No se pudo verificar",
            description: resp.message,
          });
          return;
        }

        setAlertMessage({
          type: "success",
          title: "Cuenta verificada",
          description:
            resp.message || "Tu cuenta ha sido verificada con éxito.",
        });

        // Tras éxito, regresar al login para que el usuario inicie sesión
        setTimeout(() => {
          onClose();
          setCodigo("");
          setCodigoError("");
          setAlertMessage(null);
          loginModalRef?.current?.reset?.();
          loginModalRef?.current?.open();
        }, 1200);
      } catch (e) {
        setAlertMessage({
          type: "danger",
          title: "Error de conexión",
          description: "Error inesperado. Por favor, intenta nuevamente.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const verifyModalRef = useRef<VerifyAccountModalHandle>({
      open: onOpen,
      close: onClose,
    });

    return (
      <>
        {!hideTrigger && (
          <Button color="primary" onPress={onOpen}>
            Verificar Cuenta
          </Button>
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
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">Verificar Cuenta</h2>
                  </div>
                </ModalHeader>
                <ModalBody className="flex flex-col items-center gap-6 pb-6">
                  {alertMessage && (
                    <Alert
                      color={alertMessage.type}
                      title={alertMessage.title}
                      description={alertMessage.description}
                      variant="flat"
                    />
                  )}
                  <div className="w-full flex flex-col items-center gap-3">
                    <div className="text-sm font-medium text-center">
                      Código de verificación
                    </div>
                    <div className="w-full flex justify-center">
                      <InputOtp
                        length={6}
                        value={codigo}
                        onValueChange={handleCodigoChange}
                        autoFocus
                        isDisabled={isLoading}
                      />
                    </div>
                    {codigoError && (
                      <p className="text-danger text-sm text-center">
                        {codigoError}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={handleClose}
                      isDisabled={isLoading}
                    >
                      Cancelar
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

VerifyAccount.displayName = "VerifyAccount";
