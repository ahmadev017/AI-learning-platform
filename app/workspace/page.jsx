"use client"
import React from 'react'
import WelcomeBanner from './-components/WelcomeBanner'
import CourseContent from './-components/CourseContent'
import EnrollCourseContent from './-components/enrollCourseContent'
function workspace() {
  return (
    <div className=' w-full p-4 sm:p-10'>
      <WelcomeBanner/>
      <EnrollCourseContent/>
      <CourseContent />
    </div>
  )
}

export default workspace
