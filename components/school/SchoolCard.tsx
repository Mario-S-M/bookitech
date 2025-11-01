"use client";
import { Card } from "@heroui/card";
import { Building2 } from "lucide-react";
import type { EscuelaInfo } from "@/types/escuela";
import Image from "next/image";

type Props = {
  escuela: EscuelaInfo;
  onClick?: () => void;
};

export default function EscuelaCard({ escuela, onClick }: Props) {
  // Validar si el Logo es una URL válida
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return url.startsWith("http://") || url.startsWith("https://");
    } catch {
      return false;
    }
  };

  const hasValidLogo = escuela.Logo && isValidUrl(escuela.Logo);

  return (
    <Card
      isPressable={!!onClick}
      onPress={onClick}
      className="bg-content1/80 border border-default-200 hover:border-primary/60 transition-all hover:scale-105"
    >
      <div className="flex flex-col items-center justify-center p-8 gap-4">
        <div className="p-4 rounded-full bg-primary/10 text-primary">
          {hasValidLogo ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={escuela.Logo}
                alt={escuela.Nombre}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <Building2 className="w-16 h-16" />
          )}
        </div>
        <h3 className="text-xl font-bold text-center text-foreground">
          {escuela.Nombre}
        </h3>
      </div>
    </Card>
  );
}
