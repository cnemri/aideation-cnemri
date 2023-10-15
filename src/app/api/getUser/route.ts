import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth();
  return NextResponse.json(userId, { status: 200 });
}
