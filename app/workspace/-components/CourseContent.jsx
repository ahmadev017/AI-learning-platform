"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import GenerateContentDialog from './GenerateContentDialog';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CourseCard from './CourseCard'
import { Loader, LoaderCircle, LucideLoader2 } from 'lucide-react';
import { HashLoader, RiseLoader, ScaleLoader } from 'react-spinners';
function CourseContent() {
  const [content,setContent] = useState([])
  const [loading , setLoading] = useState(false)

const user = useUser()
  const getCourseContent = async()=>{
    setLoading(true)
    const result = await axios.get('/api/get-courses')
    console.log(result.data)
    setContent(result.data)
    setLoading(false)
  }

  useEffect(()=>{
    getCourseContent()
       
  },[])



  return (
  <>
  {
    loading?
    <div className='flex items-center justify-center h-[70vh] w-full'>
      <HashLoader width={50} height={50} color="#4c53e7"/>
    </div>
    
    :
    <div>
      {
        content.length==0?
        <div className='mt-6 font-bold text-2xl flex flex-col gap-4'>
          <h2>Course List</h2>
          <div className='p-10 flex flex-col items-center justify-center bg-secondary shadow-2xl rounded-2xl gap-4 '>
            <Image src={'/online-education.png'} width={80} height={80} alt={'emoji'}/>
            <h2 className='font-bold text-xl'>Look like you haven't created any courses yet </h2>
            <GenerateContentDialog>
              <Button className='cursor-pointer'>+Create Your First Course</Button>
            </GenerateContentDialog>
            
          </div>
          </div>:
          <div className=' flex flex-col gap-4 w-full'> 
            <h1 className='font-bold text-3xl mt-4'>Course List</h1>
            <div className={`flex flex-wrap gap-5 ${content.length>=3?'flex-start':'items-center justify-center'}  w-full`}>
          
          {
            content.map((course,index)=>(
              
                <CourseCard  course={course} key={index} onEnrollSuccess={getCourseContent}/>
              
            ))
          }
        </div></div>
          
       
      }
    </div>
  }
    </>
  )
}

export default CourseContent
