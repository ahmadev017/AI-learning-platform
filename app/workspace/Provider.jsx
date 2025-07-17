"use client"
import React from 'react'
import AppSidebar from './-components/AppSidebar'
import Header from './-components/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

function WorkspaceProvider({children}) {
  return (
    
      <SidebarProvider>

      
      <AppSidebar/>
      <div className='flex flex-col w-full'>
        <Header/>
         <div>
        {children}
       
      </div>
      </div>
      
     
      
      </SidebarProvider>
    
  )
}

export default WorkspaceProvider
