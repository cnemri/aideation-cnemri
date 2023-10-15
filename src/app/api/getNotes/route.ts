import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  //   const { userId } = req.headers.get("userId") || {};
  const { userId } = auth();
  //   const userId = req.headers.get("userid")!;
  const response = await db
    .select()
    .from($notes)
    .where(eq($notes.userId, userId!));
  return NextResponse.json(response, { status: 200 });
}
