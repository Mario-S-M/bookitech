"use client";
import { useState, forwardRef, useImperativeHandle } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { InputOtp } from "@heroui/react";
import { vincularEscuela } from "@/app/actions/escuela";

export type AddSchoolCodeModalHandle = {
  open: () => void;
  close: () => void;
};

type Props = {
  userId: number | string;
  onSuccess?: (newCode: string) => void;
};

const AddSchoolCodeModal = forwardRef<AddSchoolCodeModalHandle, Props>(
  ({ userId, onSuccess }, ref) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [alertMessage, setAlertMessage] = useState<{
      type: "warning" | "danger" | "success";
      title: string;
      description: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setCode("");
        setError("");
        setAlertMessage(null);
        onOpen();
      },
      close: onClose,
    }));

    const handleCodeChange = async (value: string) => {
      // Permitir letras/números/caracteres, remover espacios, forzar MAYÚSCULAS y máximo 6
      const sanitized = value.replace(/\s+/g, "").slice(0, 6).toUpperCase();
      setCode(sanitized);
      if (!sanitized) setError("El código es obligatorio");
      else setError("");
    };

    // Eliminado: lógica de inputs personalizados, usamos InputOtp con allowedKeys

    const handleSubmit = async () => {
      setAlertMessage(null);
      const cleaned = code.trim().toUpperCase();
      if (cleaned.length !== 6) {
        setError("El código debe tener 6 caracteres en MAYÚSCULAS");
        return;
      }
      setIsLoading(true);
      const resp = await vincularEscuela(userId, cleaned);
      setIsLoading(false);
      if (!resp.success) {
        setAlertMessage({
          type: "danger",
          title: "No se pudo vincular",
          description: resp.message,
        });
        return;
      }
      setAlertMessage({
        type: "success",
        title: "¡Vinculada!",
        description: resp.message,
      });
      // close after brief delay and notify parent
      setTimeout(() => {
        onClose();
        onSuccess?.(cleaned);
      }, 900);
    };

    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(handleClose) => (
            <>
              <ModalHeader>Agregar clave de institución educativa</ModalHeader>
              <ModalBody className="flex flex-col items-center gap-4">
                {alertMessage && (
                  <Alert
                    color={alertMessage.type}
                    title={alertMessage.title}
                    description={alertMessage.description}
                    variant="flat"
                  />
                )}
                <div className="w-full flex flex-col items-center gap-2">
                  <div className="text-sm text-default-600">
                    Clave de institución educativa
                  </div>
                  <InputOtp
                    length={6}
                    allowedKeys="^[a-zA-Z0-9]*$"
                    value={code}
                    onValueChange={(v) => handleCodeChange(v.toUpperCase())}
                    isDisabled={isLoading}
                    autoFocus
                  />
                  {error && <p className="text-danger text-sm">{error}</p>}
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex w-full justify-between">
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
                    isLoading={isLoading}
                    onPress={handleSubmit}
                  >
                    Vincular
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }
);

AddSchoolCodeModal.displayName = "AddSchoolCodeModal";
export default AddSchoolCodeModal;
