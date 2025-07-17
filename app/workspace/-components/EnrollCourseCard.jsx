import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Book, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function EnrollCourseCard({course}) {

  const courseJson = course.courses.courseJson.course;
  const courseId = course.courses.cid;
 const progressPercentage = course.EnrollCourses.completedChapters.length/course.courses.courseJson.course.chapters.length *100 
 

  return (
    <div>
       <div className='w-full sm:w-[300px] bg-white shadow-xl rounded-t-2xl overflow-hidden mb-6 flex flex-col'>
      <Image className='object-cover aspect-auto' src={course.courses.imageUrl} width={400} height={200} priority alt='course image' />

      {/* Content area grows to push footer down */}
      <div className='p-2 flex flex-col'>
        <h2 className='font-bold text-lg h-15 '>{course.courses.name}</h2>
        <p className='line-clamp-3 text-xs text-gray-500 h-12'>{courseJson.description}</p>
      </div>

      {/* Footer sticks to bottom */}
      <div className='flex justify-between mx-2 my-1'>
        <h2>Progress</h2>
        <p>{progressPercentage}%</p>
      </div>
      <div className='mb-4 mx-2'>
        <Progress value={progressPercentage}/>
      </div>
        <Link href={`/workspace/learn-course/${courseId}`}>
        <Button className='cursor-pointer mb-2 px-2 mx-2 w-[350px] sm:w-[284px] flex items-center gap-2'>
          <PlayCircle className='size-4' /> Continue learning
        </Button>
      </Link>
      
      
    </div>
    </div>
  )
}

export default EnrollCourseCard
