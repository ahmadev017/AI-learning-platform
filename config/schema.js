import { boolean, integer, pgTable, varchar, json, text, unique } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar({ length: 255 }).unique(),
  name: varchar({ length: 255 }),
  description: varchar({ length: 1000 }),
  chapters: varchar({ length: 255 }),
  level: varchar({ length: 100 }),
  video: boolean(),
  courseJson: json(),
  duration: varchar({ length: 255 }),
  imageUrl: varchar({ length: 1000 }),
  userEmail: varchar({ length: 255 }).references(() => usersTable.email),
  courseContent: text(), // ✅ changed from varchar(255)
});


export const enrollCoursesTable = pgTable(
  "EnrollCourses",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    cid: varchar({ length: 255 }).references(() => coursesTable.cid),
    userEmail: varchar({ length: 255 }).references(() => usersTable.email),
    completedChapters: json().default([]),
  },
  (table) => {
    return {
      // 👇 Ensure one user can't enroll in the same course twice
      uniqueEnrollment: unique().on(table.cid, table.userEmail),
    };
  }
);

