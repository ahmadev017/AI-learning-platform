import { db } from "@/config/db"
import { currentUser } from "@clerk/nextjs/server"
import { enrollCoursesTable } from "config/schema"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"






export async function POST(req){
  const {courseId} =await req.json()
   const user =await currentUser()


   const userr =await db.select().from(enrollCoursesTable).where(and(
          eq(enrollCoursesTable.cid, courseId),
          eq(enrollCoursesTable.userEmail,user?.primaryEmailAddress.emailAddress)
        ))
    


    if (userr.length==0)
      {
         const result = await db.insert(enrollCoursesTable).values(
    {
      cid:courseId,
    userEmail:user?.primaryEmailAddress.emailAddress
    }
   ).returning()
   return NextResponse.json(result)
    }
   return NextResponse.json({
    success:true,
    message:'already enrolled'
   })


}