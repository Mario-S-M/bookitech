"use client";
import { forwardRef, useImperativeHandle, useState, RefObject } from "react";

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
import {
  Mail,
  Eye,
  EyeOff,
  User,
  Phone,
  ArrowLeft,
  Building2,
} from "lucide-react";
import HorizontalSteps from "./HorizontalSteps";
import type { LoginModalHandle } from "./LoginModal";
import { registerAction } from "@/app/actions/auth";

export type RegisterModalHandle = {
  open: () => void;
  close: () => void;
};

type Props = {
  hideTrigger?: boolean;
  loginModalRef?: RefObject<LoginModalHandle>;
};

export const RegisterModal = forwardRef<RegisterModalHandle, Props>(
  ({ hideTrigger = false, loginModalRef }, ref) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [currentStep, setCurrentStep] = useState(1);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
      useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [codigoweb, setCodigoweb] = useState("");
    const [correo, setCorreo] = useState("");
    const [confirmarCorreo, setConfirmarCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    // Estados para errores
    const [nombreError, setNombreError] = useState("");
    const [telefonoError, setTelefonoError] = useState("");
    const [codigowebError, setCodigowebError] = useState("");
    const [correoError, setCorreoError] = useState("");
    const [confirmarCorreoError, setConfirmarCorreoError] = useState("");
    const [contrasenaError, setContrasenaError] = useState("");
    const [confirmarContrasenaError, setConfirmarContrasenaError] =
      useState("");

    // Estado para el Alert
    const [alertMessage, setAlertMessage] = useState<{
      type: "warning" | "danger" | "success";
      title: string;
      description: string;
    } | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setCurrentStep(1);
          // Limpiar todos los campos
          setNombre("");
          setTelefono("");
          setCodigoweb("");
          setCorreo("");
          setConfirmarCorreo("");
          setContrasena("");
          setConfirmarContrasena("");
          // Limpiar errores
          setNombreError("");
          setTelefonoError("");
          setCodigowebError("");
          setCorreoError("");
          setConfirmarCorreoError("");
          setContrasenaError("");
          setConfirmarContrasenaError("");
          setAlertMessage(null);
          onOpen();
        },
        close: onClose,
      }),
      [onOpen, onClose]
    );

    // Validaciones
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const formatPhoneNumber = (value: string) => {
      // Remover todo excepto números
      const numbers = value.replace(/\D/g, "");
      // Limitar a 10 dígitos
      const limited = numbers.slice(0, 10);
      // Formatear como 443 313 9961
      if (limited.length <= 3) {
        return limited;
      } else if (limited.length <= 6) {
        return `${limited.slice(0, 3)} ${limited.slice(3)}`;
      } else {
        return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
      }
    };

    const handlePhoneChange = (value: string) => {
      const formatted = formatPhoneNumber(value);
      setTelefono(formatted);
      const digits = formatted.replace(/\D/g, "");
      if (digits.length !== 10) {
        setTelefonoError("El teléfono debe tener 10 dígitos");
      } else {
        setTelefonoError("");
      }
    };

    const handleCorreoChange = (value: string) => {
      setCorreo(value);
      setAlertMessage(null);
      if (!value.trim()) {
        setCorreoError("El correo es requerido");
      } else if (!validateEmail(value)) {
        setCorreoError("Correo electrónico inválido");
      } else {
        setCorreoError("");
      }
      if (confirmarCorreo) {
        if (value !== confirmarCorreo) {
          setConfirmarCorreoError("Los correos no coinciden");
        } else {
          setConfirmarCorreoError("");
        }
      }
    };

    const handleConfirmarCorreoChange = (value: string) => {
      setConfirmarCorreo(value);
      setAlertMessage(null);
      if (!value.trim()) {
        setConfirmarCorreoError("Debes confirmar tu correo");
      } else if (!validateEmail(value)) {
        setConfirmarCorreoError("Correo electrónico inválido");
      } else if (correo !== value) {
        setConfirmarCorreoError("Los correos no coinciden");
      } else {
        setConfirmarCorreoError("");
      }
    };

    const handleContrasenaChange = (value: string) => {
      setContrasena(value);
      setAlertMessage(null);
      if (!value) {
        setContrasenaError("La contraseña es requerida");
      } else if (value.length < 6) {
        setContrasenaError("La contraseña debe tener al menos 6 caracteres");
      } else {
        setContrasenaError("");
      }
      if (confirmarContrasena) {
        if (value !== confirmarContrasena) {
          setConfirmarContrasenaError("Las contraseñas no coinciden");
        } else {
          setConfirmarContrasenaError("");
        }
      }
    };

    const handleConfirmarContrasenaChange = (value: string) => {
      setConfirmarContrasena(value);
      setAlertMessage(null);
      if (!value) {
        setConfirmarContrasenaError("Debes confirmar tu contraseña");
      } else if (contrasena !== value) {
        setConfirmarContrasenaError("Las contraseñas no coinciden");
      } else {
        setConfirmarContrasenaError("");
      }
    };

    const handleNombreChange = (value: string) => {
      setNombre(value);
      const nombreTrim = value.trim();
      const partes = nombreTrim.split(/\s+/).filter(Boolean);
      if (partes.length < 2) {
        setNombreError("Ingresa al menos nombre y apellido");
      } else {
        setNombreError("");
      }
    };

    const handleCodigowebChange = (value: string) => {
      setCodigoweb(value);
      if (!value.trim()) {
        setCodigowebError("El código web es requerido");
      } else if (value.trim().length !== 6) {
        setCodigowebError("El código web debe tener 6 caracteres");
      } else {
        setCodigowebError("");
      }
    };

    const togglePasswordVisibility = () =>
      setIsPasswordVisible(!isPasswordVisible);
    const toggleConfirmPasswordVisibility = () =>
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    const handleBackToLogin = () => {
      onClose();
      setTimeout(() => loginModalRef?.current?.open(), 150);
    };

    const validateStep1 = () => {
      let isValid = true;
      setAlertMessage(null);

      // Validar nombre (al menos nombre y apellido)
      const nombreTrim = nombre.trim();
      const partesNombre = nombreTrim.split(/\s+/).filter(Boolean);
      if (partesNombre.length < 2) {
        setNombreError("Ingresa al menos nombre y apellido");
        isValid = false;
      } else {
        setNombreError("");
      }

      // Validar teléfono (debe tener exactamente 10 dígitos)
      const phoneNumbers = telefono.replace(/\D/g, "");
      if (!phoneNumbers) {
        setTelefonoError("El teléfono es requerido");
        isValid = false;
      } else if (phoneNumbers.length !== 10) {
        setTelefonoError("El teléfono debe tener 10 dígitos");
        isValid = false;
      } else {
        setTelefonoError("");
      }

      // Validar código web (antes: clave de institución)
      const codigoTrim = codigoweb.trim();
      if (!codigoTrim) {
        setCodigowebError("El código web es requerido");
        isValid = false;
      } else if (codigoTrim.length !== 6) {
        setCodigowebError("El código web debe tener 6 caracteres");
        isValid = false;
      } else {
        setCodigowebError("");
      }

      if (!isValid) {
        setAlertMessage({
          type: "danger",
          title: "Campos incompletos",
          description: "Por favor, completa todos los campos correctamente",
        });
      }

      return isValid;
    };

    const validateStep2 = () => {
      let isValid = true;
      setAlertMessage(null);

      // Validar correo
      if (!correo.trim()) {
        setCorreoError("El correo es requerido");
        isValid = false;
      } else if (!validateEmail(correo)) {
        setCorreoError("Correo electrónico inválido");
        isValid = false;
      } else {
        setCorreoError("");
      }

      // Validar confirmar correo
      if (!confirmarCorreo.trim()) {
        setConfirmarCorreoError("Debes confirmar tu correo");
        isValid = false;
      } else if (correo !== confirmarCorreo) {
        setConfirmarCorreoError("Los correos no coinciden");
        isValid = false;
      } else {
        setConfirmarCorreoError("");
      }

      // Validar contraseña
      if (!contrasena) {
        setContrasenaError("La contraseña es requerida");
        isValid = false;
      } else if (contrasena.length < 6) {
        setContrasenaError("La contraseña debe tener al menos 6 caracteres");
        isValid = false;
      } else {
        setContrasenaError("");
      }

      // Validar confirmar contraseña
      if (!confirmarContrasena) {
        setConfirmarContrasenaError("Debes confirmar tu contraseña");
        isValid = false;
      } else if (contrasena !== confirmarContrasena) {
        setConfirmarContrasenaError("Las contraseñas no coinciden");
        isValid = false;
      } else {
        setConfirmarContrasenaError("");
      }

      if (!isValid) {
        setAlertMessage({
          type: "danger",
          title: "Datos inválidos",
          description:
            "Por favor, verifica que los campos sean correctos y coincidan",
        });
      }

      return isValid;
    };

    const handleNext = () => {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    };

    const handlePrevious = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        setAlertMessage(null);
      }
    };

    const handleRegister = async () => {
      if (!validateStep2()) {
        return;
      }

      setIsLoading(true);
      setAlertMessage(null);

      try {
        const phoneNumbers = telefono.replace(/\D/g, "");

        const result = await registerAction({
          nombre: nombre.trim(),
          telefono: Number(phoneNumbers),
          codigoweb: codigoweb.trim(),
          correo: correo.trim(),
          contrasena: contrasena,
        });

        if (!result.success) {
          setAlertMessage({
            type: "danger",
            title: "Error al registrarse",
            description: result.message || "No se pudo crear la cuenta",
          });
          setIsLoading(false);
          return;
        }

        // Registro exitoso
        setAlertMessage({
          type: "success",
          title: "¡Cuenta creada exitosamente!",
          description:
            "Por favor, revisa tu correo electrónico para verificar y validar tu cuenta antes de iniciar sesión.",
        });
        // Nota: No cerrar automáticamente; dejamos el modal abierto con el Alert de éxito
      } catch (error) {
        console.error("Error en handleRegister:", error);
        setAlertMessage({
          type: "danger",
          title: "Error de conexión",
          description: "Error inesperado. Por favor, intenta nuevamente.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Flags derivados para habilitar/deshabilitar "Siguiente" en Paso 1
    // Reglas: nombre con al menos 2 palabras, teléfono con 10 dígitos, código web de 6 caracteres
    const step1Ready =
      nombre.trim().split(/\s+/).filter(Boolean).length >= 2 &&
      telefono.replace(/\D/g, "").length === 10 &&
      codigoweb.trim().length === 6;

    return (
      <>
        {!hideTrigger && (
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={onOpen}
          >
            Registrarse
          </span>
        )}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          size="lg"
        >
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
                    <h2 className="text-xl font-bold">Crear Cuenta</h2>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="w-full flex justify-center px-4">
                    <HorizontalSteps
                      className="w-full"
                      currentStep={currentStep - 1}
                      steps={[
                        {
                          title: "Datos Generales",
                        },
                        {
                          title: "Datos de la Cuenta",
                        },
                      ]}
                    />
                  </div>

                  {alertMessage && (
                    <Alert
                      color={alertMessage.type}
                      title={alertMessage.title}
                      description={alertMessage.description}
                      variant="flat"
                    />
                  )}

                  {/* Paso 1: Datos Generales */}
                  {currentStep === 1 && (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-lg font-semibold">Datos Generales</h3>
                      <Input
                        endContent={
                          <User className="text-xl text-default-400 pointer-events-none shrink-0" />
                        }
                        label="Nombre Completo"
                        variant="bordered"
                        value={nombre}
                        onValueChange={handleNombreChange}
                        errorMessage={nombreError}
                        isInvalid={!!nombreError}
                        isRequired
                      />
                      <Input
                        endContent={
                          <Phone className="text-xl text-default-400 pointer-events-none shrink-0" />
                        }
                        label="Número de Teléfono"
                        variant="bordered"
                        type="tel"
                        value={telefono}
                        onValueChange={handlePhoneChange}
                        errorMessage={telefonoError}
                        isInvalid={!!telefonoError}
                        maxLength={12}
                        isRequired
                      />
                      <Input
                        endContent={
                          <Building2 className="text-xl text-default-400 pointer-events-none shrink-0" />
                        }
                        label="Clave de Institución Educativa"
                        variant="bordered"
                        value={codigoweb}
                        onValueChange={handleCodigowebChange}
                        errorMessage={codigowebError}
                        isInvalid={!!codigowebError}
                        maxLength={6}
                        isRequired
                      />
                    </div>
                  )}

                  {/* Paso 2: Datos de la Cuenta */}
                  {currentStep === 2 && (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-lg font-semibold">
                        Datos de la Cuenta
                      </h3>
                      <Input
                        endContent={
                          <Mail className="text-xl text-default-400 pointer-events-none shrink-0" />
                        }
                        label="Correo Electrónico"
                        variant="bordered"
                        type="email"
                        value={correo}
                        onValueChange={handleCorreoChange}
                        errorMessage={correoError}
                        isInvalid={!!correoError}
                        isRequired
                      />
                      <Input
                        endContent={
                          <Mail className="text-xl text-default-400 pointer-events-none shrink-0" />
                        }
                        label="Confirmar Correo Electrónico"
                        variant="bordered"
                        type="email"
                        value={confirmarCorreo}
                        onValueChange={handleConfirmarCorreoChange}
                        errorMessage={confirmarCorreoError}
                        isInvalid={!!confirmarCorreoError}
                        isRequired
                      />
                      <Input
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-none"
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {isPasswordVisible ? (
                              <EyeOff className="text-xl text-default-400 pointer-events-none" />
                            ) : (
                              <Eye className="text-xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        label="Contraseña"
                        type={isPasswordVisible ? "text" : "password"}
                        variant="bordered"
                        value={contrasena}
                        onValueChange={handleContrasenaChange}
                        errorMessage={contrasenaError}
                        isInvalid={!!contrasenaError}
                        isRequired
                      />
                      <Input
                        endContent={
                          <button
                            aria-label="toggle confirm password visibility"
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {isConfirmPasswordVisible ? (
                              <EyeOff className="text-xl text-default-400 pointer-events-none" />
                            ) : (
                              <Eye className="text-xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        label="Confirmar Contraseña"
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        variant="bordered"
                        value={confirmarContrasena}
                        onValueChange={handleConfirmarContrasenaChange}
                        errorMessage={confirmarContrasenaError}
                        isInvalid={!!confirmarContrasenaError}
                        isRequired
                      />
                    </div>
                  )}

                  {/* Botones de navegación */}
                  <div className="flex justify-between mt-4">
                    {currentStep === 1 ? (
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={handleClose}
                        isDisabled={isLoading}
                      >
                        Cancelar
                      </Button>
                    ) : (
                      <Button
                        color="default"
                        variant="flat"
                        onPress={handlePrevious}
                        isDisabled={isLoading}
                      >
                        Anterior
                      </Button>
                    )}

                    {currentStep === 1 ? (
                      <Button
                        color="primary"
                        onPress={handleNext}
                        isDisabled={isLoading || !step1Ready}
                      >
                        Siguiente
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        onPress={handleRegister}
                        isLoading={isLoading}
                      >
                        Registrarse
                      </Button>
                    )}
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

RegisterModal.displayName = "RegisterModal";
