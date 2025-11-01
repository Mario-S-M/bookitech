import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const rawName = cookieStore.get("user-name")?.value || null;
  const rawEmail = cookieStore.get("user-email")?.value || null;

  const decode = (v: string | null) => {
    if (!v) return null;
    try {
      // Many devtools show encoded cookie values; decode defensively
      const decoded = decodeURIComponent(v);
      const trimmed = decoded.trim();
      return trimmed.length ? trimmed : null;
    } catch {
      const trimmed = v.trim();
      return trimmed.length ? trimmed : null;
    }
  };

  const name = decode(rawName);
  const email = decode(rawEmail);

  return NextResponse.json({ name, email });
}
