"use client";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Alert } from "@heroui/alert";
import { Mail, Eye, EyeOff } from "lucide-react";
import { RegisterModal, type RegisterModalHandle } from "./RegisterModal";
import {
  ForgotPasswordModal,
  type ForgotPasswordModalHandle,
} from "./ForgotPasswordModal";
import { loginAction } from "@/app/actions/auth";

export type LoginModalHandle = {
  open: () => void;
  close: () => void;
};
type Props = {
  hideTrigger?: boolean;
};

export const LoginModal = forwardRef<LoginModalHandle, Props>(
  ({ hideTrigger = false }, ref) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [alertMessage, setAlertMessage] = useState<{
      type: "warning" | "danger" | "success";
      title: string;
      description: string;
    } | null>(null);
    const registerRef = useRef<RegisterModalHandle>(null);
    const forgotPasswordRef = useRef<ForgotPasswordModalHandle>(null);

    useImperativeHandle(
      ref,
      () => ({
        open: onOpen,
        close: onClose,
      }),
      [onOpen, onClose]
    );

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleEmailChange = (value: string) => {
      setEmail(value);
      if (value && !validateEmail(value)) {
        setEmailError("Por favor, ingresa un correo electrónico válido");
      } else {
        setEmailError("");
      }
    };

    const handleLogin = async () => {
      // Limpiar alerta anterior
      setAlertMessage(null);

      if (!email || !password) {
        setAlertMessage({
          type: "danger",
          title: "Campos incompletos",
          description: "Por favor, completa todos los campos",
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
        const result = await loginAction({
          correo: email,
          contrasena: password,
        });

        if (result.needsVerification) {
          // Usuario no verificado
          setAlertMessage({
            type: "warning",
            title: "Usuario sin verificar",
            description:
              result.message ||
              "Por favor, revise su correo electrónico para validar su cuenta antes de continuar.",
          });
          setIsLoading(false);
          return;
        }

        if (!result.success) {
          // Error en el login
          setAlertMessage({
            type: "danger",
            title: "Error al iniciar sesión",
            description: result.message || "Credenciales inválidas",
          });
          setIsLoading(false);
          return;
        }

        // Login exitoso - mostrar mensaje de éxito brevemente
        setAlertMessage({
          type: "success",
          title: "¡Bienvenido!",
          description: result.message || `Hola ${result.user?.nombre || ""}`,
        });

        console.log("✅ Usuario logueado:", result.user);

        // Limpiar formulario y cerrar modal después de un breve delay
        setTimeout(() => {
          setEmail("");
          setPassword("");
          setEmailError("");
          setAlertMessage(null);
          onClose();
        }, 1500);
      } catch (error) {
        console.error("Error en handleLogin:", error);
        setAlertMessage({
          type: "danger",
          title: "Error de conexión",
          description: "Error inesperado. Por favor, intenta nuevamente.",
        });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    const loginModalRef = useRef<LoginModalHandle>({
      open: onOpen,
      close: onClose,
    });

    return (
      <>
        {!hideTrigger && (
          <Button color="primary" onPress={onOpen}>
            Iniciar Sesión
          </Button>
        )}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            {(handleClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Iniciar Sesión
                </ModalHeader>
                <ModalBody>
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
                      <Mail className="text-2xl text-default-400 pointer-events-none shrink-0" />
                    }
                    errorMessage={emailError}
                    isInvalid={!!emailError}
                    label="Correo Electrónico"
                    placeholder="correo@ejemplo.com"
                    type="email"
                    value={email}
                    variant="bordered"
                    onValueChange={handleEmailChange}
                  />
                  <Input
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-solid outline-transparent"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <Eye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    type={isVisible ? "text" : "password"}
                    value={password}
                    variant="bordered"
                    onValueChange={setPassword}
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <button
                      type="button"
                      className="text-primary cursor-pointer hover:underline text-sm"
                      onClick={() => {
                        handleClose();
                        setTimeout(
                          () => forgotPasswordRef.current?.open(),
                          150
                        );
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className="flex justify-between">
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
                      onPress={handleLogin}
                      isLoading={isLoading}
                    >
                      Iniciar Sesión
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="w-full flex justify-center items-center gap-2">
                    ¿No tienes cuenta?
                    <button
                      type="button"
                      className="text-primary cursor-pointer hover:underline"
                      onClick={() => {
                        handleClose();
                        setTimeout(() => registerRef.current?.open(), 150);
                      }}
                    >
                      Registrarse
                    </button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <RegisterModal
          ref={registerRef}
          loginModalRef={loginModalRef}
          hideTrigger
        />
        <ForgotPasswordModal
          ref={forgotPasswordRef}
          loginModalRef={loginModalRef}
          hideTrigger
        />
      </>
    );
  }
);

LoginModal.displayName = "LoginModal";
