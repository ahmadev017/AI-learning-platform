import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard'
import axios from 'axios'
function EnrollCourseContent() {
  
  const [enrollContent,setEnrollContent] = useState([])
  const [loading , setLoading] = useState(false)




  useEffect(()=>{
    getEnrollCourse()
  },[])


  const getEnrollCourse = async()=>{
    setLoading(true)
      const result =await axios.get('/api/getEnrollCourses')
      setEnrollContent(result.data)
      console.log(result.data)
      setLoading(false)
    }
  return (

    
    <div className='border-b-4'>
      <h2 className='my-5 font-bold text-2xl'>Enrolled courses</h2>
      <div className={`flex flex-wrap gap-5 w-full`}>
        {enrollContent.map((course , index)=>(
          <EnrollCourseCard key={index} course={course}/>
        ))
          
        }
        
      </div>
      
    </div>
  )
}

export default EnrollCourseContent
