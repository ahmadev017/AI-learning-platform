"use client"
import axios from 'axios';
import { UserDetailContext } from '../context/UserDetailContext'; // go up one level from /app
import { SelectedItemIndexContext } from '../context/SelectedItemIndexContext';
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';

function Provider({children}) {
  const {user} = useUser();
  const [userDetail, setUserDetail] = useState()
  const [indexx,setIndexx] =useState(0)

  const createUser=async()=>{
    const result = await axios.post('/api/user',{
      name:user?.fullName,
      email:user?.primaryEmailAddress.emailAddress
      })
      console.log(result.data)
      setUserDetail(result.data)
  }
  useEffect(()=>{
    user&&createUser()
  },[user])
  return (
      <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <SelectedItemIndexContext.Provider value={{indexx, setIndexx}}>
      {children}
      </SelectedItemIndexContext.Provider>
    </UserDetailContext.Provider>

  )
}

export default Provider
