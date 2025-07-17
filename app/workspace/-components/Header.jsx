"use client"
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className='p-4 flex justify-between w-full shadow-sm bg-gray-100 sticky top-0 z-20'>

      <SidebarTrigger />
      <div className='mr-2'>
        <UserButton />
      </div>
    </div>
  )
}

export default Header
