"use client";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

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
import { VerifyAccount, type VerifyAccountModalHandle } from "./VerifyAccount";
import { loginAction } from "@/app/actions/auth";
import { Form } from "@heroui/react";
import { useRouter } from "next/navigation";

export type LoginModalHandle = {
  open: () => void;
  close: () => void;
  reset: () => void;
};

type Props = {
  hideTrigger?: boolean;
};

export const LoginModal = forwardRef<LoginModalHandle, Props>(
  ({ hideTrigger = false }, ref) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [alertMessage, setAlertMessage] = useState<{
      type: "warning" | "danger" | "success";
      title: string;
      description: string;
    } | null>(null);
    const [unverifiedUserId, setUnverifiedUserId] = useState<number | null>(
      null
    );
    const registerRef = useRef<RegisterModalHandle>(null);
    const forgotPasswordRef = useRef<ForgotPasswordModalHandle>(null);
    const verifyAccountRef = useRef<VerifyAccountModalHandle>(null);

    const resetForm = () => {
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
      setAlertMessage(null);
      setIsVisible(false);
      setIsLoading(false);
    };

    useImperativeHandle(
      ref,
      () => ({
        open: onOpen,
        close: onClose,
        reset: resetForm,
      }),
      [onOpen, onClose]
    );

    // Prefetch dashboard for instant navigation after login
    useEffect(() => {
      // Best-effort prefetch; ignore errors silently
      try {
        router.prefetch("/dashboard");
      } catch {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleEmailChange = (value: string) => {
      setEmail(value);
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

    const handlePasswordChange = (value: string) => {
      setPassword(value);
      if (!value) {
        setPasswordError("La contraseña es obligatoria");
      } else {
        setPasswordError("");
      }
    };

    const handleLogin = async () => {
      setAlertMessage(null);

      if (!email || !password) {
        if (!email) setEmailError("El correo es obligatorio");
        if (!password) setPasswordError("La contraseña es obligatoria");
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

      setPasswordError("");
      setIsLoading(true);

      try {
        const result = await loginAction({
          correo: email,
          contrasena: password,
        });

        if (result.needsVerification) {
          const idCandidate = (result.user?.id ?? null) as unknown as
            | string
            | number
            | null;
          const parsedId =
            typeof idCandidate === "string"
              ? parseInt(idCandidate, 10)
              : (idCandidate as number | null);
          setUnverifiedUserId(
            parsedId && !Number.isNaN(parsedId) ? parsedId : null
          );
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
          setAlertMessage({
            type: "danger",
            title: "Error al iniciar sesión",
            description: result.message || "Credenciales inválidas",
          });
          setIsLoading(false);
          return;
        }

        // Éxito: limpiar y redirigir inmediatamente
        setEmail("");
        setPassword("");
        setEmailError("");
        setAlertMessage(null);
        // Cerrar el modal y navegar de inmediato; replace evita volver al login
        onClose();
        router.replace("/dashboard");
      } catch (error) {
        console.error("Error en handleLogin:", error);
        setAlertMessage({
          type: "danger",
          title: "Error de conexión",
          description: "Error inesperado. Por favor, intenta nuevamente.",
        });
      } finally {
        // Evitar parpadeos: dejamos el loading hasta que el router navegue
        setTimeout(() => setIsLoading(false), 200);
      }
    };

    const loginModalRef = useRef<LoginModalHandle>({
      open: onOpen,
      close: onClose,
      reset: resetForm,
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
                  {alertMessage &&
                    (alertMessage.type === "warning" ? (
                      <Alert
                        color="warning"
                        title={alertMessage.title}
                        description={alertMessage.description}
                        variant="faded"
                        endContent={
                          <Button
                            color="warning"
                            size="sm"
                            variant="flat"
                            onPress={() => {
                              handleClose();
                              setTimeout(
                                () => verifyAccountRef.current?.open(),
                                150
                              );
                            }}
                          >
                            Verificar
                          </Button>
                        }
                      />
                    ) : (
                      <Alert
                        color={alertMessage.type}
                        title={alertMessage.title}
                        description={alertMessage.description}
                        variant="flat"
                      />
                    ))}
                  <Form
                    id="login-form"
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    <Input
                      endContent={
                        <Mail className="text-2xl text-default-400 pointer-events-none shrink-0" />
                      }
                      errorMessage={emailError}
                      isInvalid={!!emailError}
                      label="Correo Electrónico"
                      type="email"
                      name="email"
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
                      errorMessage={passwordError}
                      isInvalid={!!passwordError}
                      label="Contraseña"
                      type={isVisible ? "text" : "password"}
                      name="password"
                      value={password}
                      variant="bordered"
                      onValueChange={handlePasswordChange}
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
                  </Form>
                </ModalBody>
                <ModalFooter className="flex flex-col gap-2">
                  <div className="flex w-full justify-between">
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={handleClose}
                      isDisabled={isLoading}
                      type="button"
                    >
                      Cancelar
                    </Button>
                    <Button
                      color="primary"
                      isLoading={isLoading}
                      type="submit"
                      form="login-form"
                      onPress={() => {
                        // fallback for button click (for some UI libraries)
                        const form = document.getElementById(
                          "login-form"
                        ) as HTMLFormElement | null;
                        if (form) form.requestSubmit();
                      }}
                    >
                      Iniciar Sesión
                    </Button>
                  </div>
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
        <VerifyAccount
          ref={verifyAccountRef}
          loginModalRef={loginModalRef}
          userId={unverifiedUserId ?? undefined}
          hideTrigger
        />
      </>
    );
  }
);

LoginModal.displayName = "LoginModal";
