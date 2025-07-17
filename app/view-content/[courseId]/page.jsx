"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Content from  '@/app/view-content/-components/Content'
import { Loader2 } from 'lucide-react'
function ViewContent() {
  const {courseId} = useParams();  
  const [enrollContent,setEnrollContent] = useState([])
  const [loading, setLoading] = useState(false)

    useEffect(()=>{
      getEnrollCourse()
    },[])
  
  
    const getEnrollCourse = async()=>{
      setLoading(true)
      setLoading(true)
        const result =await axios.post('/api/getEnrollCourse',{
          courseId:courseId
        })
        setEnrollContent(result.data)
        console.log(result.data)
        setLoading(false)
        setLoading(false)
      }
  return (
    <div className='flex items-center justify-center min-h-screen'>
      {
        loading?

        <Loader2 size={80} className=' animate-spin text-gray-500'/>:
        <Content/>
      }
      
      
    </div>
  )
}

export default ViewContent
