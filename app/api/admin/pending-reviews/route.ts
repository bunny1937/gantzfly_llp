import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, getAdminAuth } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "giantzflyexim@gmail.com";

async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return false;
  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    return decoded.email === ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminDb = getAdminDb();

  const snap = await adminDb
    .collection("reviews")
    .where("approved", "==", false)
    .orderBy("createdAt", "desc")
    .get();

  const reviews = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json({ reviews });
}
