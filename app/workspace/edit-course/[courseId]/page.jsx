"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseInfo from '../-components/CourseInfo'
import CourseLayout from '../-components/CourseLayout'
import { Loader, Loader2Icon } from "lucide-react";

function EditCourse() {
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

  return(
    <div>
      {
        loading?
        <div className="flex w-full min-h-screen items-center justify-center">
          <Loader2Icon width={80} height={80} className="animate-spin text-gray-600"/>
        </div>
        :
        <div className="p-6">
           <CourseInfo course={course}/>
      <CourseLayout course={course}/>
        </div>
      }
    
      </div>
      
     
    
    
  )
}

export default EditCourse;

