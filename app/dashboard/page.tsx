import EscuelasSection from "@/components/school/SchoolSection";
import {
  getEscuelasVinculadas,
  getUserIdFromCookies,
} from "@/app/actions/escuela";

export default async function DashboardPage() {
  const userId = await getUserIdFromCookies();
  let content: React.ReactNode = null;

  if (!userId) {
    content = (
      <p className="text-danger-500">
        No se pudo determinar el usuario. Inicia sesión nuevamente.
      </p>
    );
  } else {
    const resp = await getEscuelasVinculadas(userId);
    if (!resp.success) {
      content = (
        <div className="text-danger-500">
          Error al cargar escuelas: {resp.message}
        </div>
      );
    } else {
      content = (
        <EscuelasSection userId={userId} initialEscuelas={resp.escuelas} />
      );
    }
  }

  return (
    <main className="min-h-[60vh] flex flex-col gap-6 p-6">{content}</main>
  );
}
