import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin (server-side only)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const adminDb = getFirestore();

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  // Simple secret header check — only you know this key
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reviewId, action } = await req.json(); // action: 'approve' | 'reject'

  if (!reviewId) {
    return NextResponse.json({ error: "reviewId required" }, { status: 400 });
  }

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
