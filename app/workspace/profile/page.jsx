import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Profile() {
  return (
    <div className='p-10 flex flex-col gap-4'>
      <h2 className='font-bold text-2xl'>Edit Your Profile</h2>
      <div className='flex sm:justify-start items-center justify-center'>
        <UserProfile/>
      </div>
      
    </div>
  )
}

export default Profile
