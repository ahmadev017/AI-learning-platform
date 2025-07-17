"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from '../-components/EnrollCourseCard';
import CourseCard from '../-components/CourseCard';
import { Loader2 } from 'lucide-react';

function Explore() {

    const [exploreContent, setExploreContent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getExploreCourse();
  }, []);

  const getExploreCourse = async () => {
    setLoading(true);
    const result = await axios.get("/api/getExploreCourses");
    setExploreContent(result.data);
    console.log(result.data);
    setLoading(false);
  };
  return (
    <div className='p-4 sm:p-10'>
      {
        loading?
        <div className='flex items-center justify-center min-h-[60vh] text-gray-500'>
            <Loader2 className='animate-spin' size={80}/>
        </div>:
        
          <div>
    <h2 className="my-5 font-bold text-2xl">Explore courses created by other users</h2>
     
      <div className="flex flex-wrap gap-5 w-full items-start justify-start">
        {exploreContent.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    
  </div>
        
      
      }
        
    </div>
  )
}

export default Explore
