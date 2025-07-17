"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseInfoo from  '@/app/workspace/learn-course/-components/Infoo'
import CourseLayout from  '@/app/workspace/edit-course/-components/CourseLayout'
import axios from 'axios';
import { Loader2 } from 'lucide-react'

function LearnCourse() {
    const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading , setLoading] = useState(false)

  const getCourseInfo = async () => {
    setLoading(true)
    try {
      const result = await axios.get("/api/courses?courseId=" + courseId);
      console.log(result.data);
      setCourse(result.data);
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch course:", error);
    }
  };

  useEffect(() => {
    if (courseId) {
      getCourseInfo();
    }
  }, [courseId]);
  return (
    <div className='p-5'>
      {
        loading?
        <div className='flex items-center justify-center min-h-[60vh] text-gray-500'>
          <Loader2 className='animate-spin' size={80}/>
        </div>:
        <div>
          <CourseInfoo course={course} />
      <CourseLayout course={course}/>
        </div>
        
      }
      
    </div>
  )
}

export default LearnCourse
