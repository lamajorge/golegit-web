import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.REVALIDATE_SECRET;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!SECRET || token !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/novedades");
  revalidatePath("/novedades/[slug]", "page");
  revalidatePath("/recursos");
  revalidatePath("/recursos/[slug]", "page");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
