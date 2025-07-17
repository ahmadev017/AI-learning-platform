import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized, sign in first" }, { status: 401 });
  }

  const result = await db
    .select()
    .from(coursesTable)
    .where(ne(coursesTable.courseContent, "")) // ✅ filter out empty content
    .orderBy(desc(coursesTable.id));

  return NextResponse.json(result);
}

