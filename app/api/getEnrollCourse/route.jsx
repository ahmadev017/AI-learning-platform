import { currentUser } from "@clerk/nextjs/server";
import { db } from "config/db";
import { coursesTable, enrollCoursesTable } from "config/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId } = await req.json();
  const user = await currentUser();



  const result = await db
    .select()
    .from(coursesTable)
    .innerJoin(enrollCoursesTable, eq(coursesTable.cid, enrollCoursesTable.cid))
    .where(
      and(
        eq(enrollCoursesTable.userEmail, user.primaryEmailAddress.emailAddress),
        eq(enrollCoursesTable.cid, courseId)
      )
    );

  return NextResponse.json(result[0]);
}
