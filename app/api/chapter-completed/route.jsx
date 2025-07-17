import { currentUser } from "@clerk/nextjs/server";
import { enrollCoursesTable } from "@/config/schema"; // ✅ Use absolute import if in /config
import { db } from "@/config/db"; // ✅ Make sure your Drizzle db is imported
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { completedChapter, courseId } = await req.json();
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .update(enrollCoursesTable)
      .set({ completedChapters:completedChapter })
      .where(
        and(
          eq(enrollCoursesTable.cid, courseId),
          eq(enrollCoursesTable.userEmail, user.primaryEmailAddress.emailAddress)
        )
      ).returning(enrollCoursesTable);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating completed chapters:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

