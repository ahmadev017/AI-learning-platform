import { currentUser } from "@clerk/nextjs/server";
import { db } from "config/db";
import { coursesTable, enrollCoursesTable } from "config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";





export async function GET(){

    const user =await currentUser()
    

    const result = await db.select().from(coursesTable).innerJoin(enrollCoursesTable,eq(coursesTable.cid,enrollCoursesTable.cid)).where(eq(enrollCoursesTable.userEmail,user?.primaryEmailAddress.emailAddress))

    return NextResponse.json(result)

}