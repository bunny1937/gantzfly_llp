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

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reviewId, action } = await req.json();

  if (!reviewId) {
    return NextResponse.json({ error: "reviewId required" }, { status: 400 });
  }

  const adminDb = getAdminDb();

  if (action === "approve") {
    await adminDb
      .collection("reviews")
      .doc(reviewId)
      .update({ approved: true });
    return NextResponse.json({ success: true, status: "approved" });
  }

  if (action === "reject") {
    await adminDb.collection("reviews").doc(reviewId).delete();
    return NextResponse.json({ success: true, status: "deleted" });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
