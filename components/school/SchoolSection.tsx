"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import { useRouter } from "next/navigation";
import EscuelaGrid from "./SchoolGrid";
import AddSchoolCodeModal, {
  type AddSchoolCodeModalHandle,
} from "./AddSchoolCodeModal";
import type { EscuelaInfo } from "@/types/escuela";
import { Search } from "lucide-react";

type Props = {
  userId: string | number;
  initialEscuelas: EscuelaInfo[];
};

export default function EscuelasSection({ userId, initialEscuelas }: Props) {
  const router = useRouter();
  const modalRef = useRef<AddSchoolCodeModalHandle>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9; // 3 columns * 3 rows

  const escuelas = useMemo(() => initialEscuelas, [initialEscuelas]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return escuelas;
    return escuelas.filter((e) => e.Nombre?.toLowerCase().includes(q));
  }, [escuelas, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    // Reset to first page when query changes
    setPage(1);
  }, [query]);

  useEffect(() => {
    // Clamp current page when data size changes
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <div className="flex flex-col gap-5">
      {/* Header with search and action on the right */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-semibold">Escuelas</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            aria-label="Buscar escuela"
            startContent={<Search />}
            value={query}
            onValueChange={setQuery}
            isClearable
            className="w-full sm:w-72"
            variant="bordered"
          />
          <Button
            color="primary"
            variant="solid"
            onPress={() => modalRef.current?.open()}
          >
            Agregar clave
          </Button>
        </div>
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="w-full py-10 text-center text-default-500 max-w-7xl mx-auto">
          No se encontraron escuelas.
        </div>
      ) : (
        <EscuelaGrid escuelas={paged} />
      )}

      {/* Pagination (only if more than 1 page and there are results) */}
      {filtered.length > 0 && totalPages > 1 && (
        <div className="flex justify-center pt-2">
          <Pagination
            total={totalPages}
            page={page}
            onChange={setPage}
            color="primary"
            showControls
            radius="full"
            className="bg-content1/60 px-3 py-2 rounded-large border border-default-200"
          />
        </div>
      )}

      <AddSchoolCodeModal
        ref={modalRef}
        userId={userId}
        onSuccess={() => router.refresh()}
      />
    </div>
  );
}
