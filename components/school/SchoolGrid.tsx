import EscuelaCard from "./SchoolCard";
import type { EscuelaInfo } from "@/types/escuela";

export type EscuelaGridProps = {
  escuelas: EscuelaInfo[];
};

export default function EscuelaGrid({ escuelas }: EscuelaGridProps) {
  if (!escuelas || escuelas.length === 0) {
    return (
      <div className="w-full py-10 text-center text-default-500">
        No tienes escuelas vinculadas todavía.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-w-7xl mx-auto">
      {escuelas.map((escuela) => (
        <div key={escuela.Id} className="w-full max-w-md">
          <EscuelaCard escuela={escuela} />
        </div>
      ))}
    </div>
  );
}
