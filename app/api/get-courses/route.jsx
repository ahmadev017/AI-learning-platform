import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = await currentUser(); // ✅ must call the function

  if (!user) {
    return NextResponse.json({ error: "Unauthorized, sign in first" }, { status: 401 });
  }

  const result = await db
    .select()
    .from(coursesTable) // ✅ not a string
    .where(eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(coursesTable.id)) // ✅ correct path

  return NextResponse.json(result);
}
