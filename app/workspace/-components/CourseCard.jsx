"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Loader, Loader2, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { toast } from 'sonner';

function CourseCard({ course , onEnrollSuccess}) {
  const courseJson = course?.courseJson?.course;
  const courseId = course.cid;
  const [loading , setloading] = useState(false)
  const [enabled, setEnabled] = useState(false);
 const router =useRouter()
  const courseEnrollment = async ()=>{


    try {
       setloading(true)
      const result = await axios.post('/api/enroll-course',{
        courseId:courseId
      })
      if(result.data.message === 'already enrolled'){
        toast.warning('Already enrolled.')
      }
      else{
        toast.success('Enrolled succefully')
        if (onEnrollSuccess) onEnrollSuccess()
          router.refresh()
      }
      
      setloading(false)
      setEnabled(true)
    } catch (error) {
      toast.error('server side error')
      setloading(false)
    }


      
  }

  return (
    <div className='w-full sm:w-[300px] bg-white shadow-xl rounded-t-2xl overflow-hidden mb-6 flex flex-col'>
      <Image className='object-cover aspect-auto' src={course.imageUrl} width={400} height={200} priority alt='course image' />

      {/* Content area grows to push footer down */}
      <div className='p-2 flex flex-col'>
        <h2 className='font-bold text-lg h-15 '>{course.name}</h2>
        <p className='line-clamp-3 text-xs text-gray-500 h-12'>{courseJson.description}</p>
      </div>

      {/* Footer sticks to bottom */}
      <div className='flex justify-between items-center px-2 py-3'>
        <div className='flex items-center gap-2'>
          <Book className='text-blue-500 size-5' />
          <h2 className='text-sm font-semibold'>
            {course.chapters} <span>chapters</span>
          </h2>
        </div>
        {
          course.courseContent==null?
          <Link href={'/workspace/edit-course/'+courseId}><Button className='text-sm px-3 py-2 h-auto cursor-pointer' variant='outline'><Settings/>Generate Course</Button></Link>
          :
          <Button className='text-sm px-3 py-2 h-auto cursor-pointer'  onClick={courseEnrollment}>
            {
              loading?
              <Loader2 className='size-4 animate-spin'/>:
              <PlayCircle className=' size-4' />
            }
           Enroll Course
        </Button>
        }
        
      </div>
    </div>
  );
}

export default CourseCard;

