"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseInfo from  '@/app/workspace/edit-course/-components/CourseInfo'
import CourseLayout from  '@/app/workspace/edit-course/-components/CourseLayout'
import axios from 'axios';
import { Loader2 } from 'lucide-react'

function LearnCourse(learnCourse=true) {
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
        <div className='flex items-center justify-center min-h'>
          <Loader2 size={80}/>
        </div>:
        <div>
          <CourseInfo course={course} learnCorse={learnCourse}/>
      <CourseLayout course={course}/>
        </div>
        
      }
      
    </div>
  )
}

export default LearnCourse
