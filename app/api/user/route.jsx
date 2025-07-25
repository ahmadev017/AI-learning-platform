import { db } from "../../../config/db";

import { usersTable } from "../../../config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";





export async function POST(req){
  const {name, email}=await req.json();

  const user=await db.select().from(usersTable).where(eq(usersTable.email,email))

  if (user.length===0){
    const result = await db.insert(usersTable).values({
      name:name,
      email:email
    }).returning()
    return NextResponse.json(result[0])
  }
  return NextResponse.json(user[0])
}