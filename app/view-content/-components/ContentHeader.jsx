import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function ContentHeader() {
  return (
    <div className='p-5  w-full shadow-sm bg-gray-100 sticky top-0 z-50 flex justify-between '>
      
      <SidebarTrigger/>
        <UserButton className='w-2xl' />
      
    </div>
  )
}

export default ContentHeader
