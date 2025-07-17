"use client"
import React from 'react'

import ContentHeader from  '@/app/view-content/-components/ContentHeader'
import ContentSidebar from  '@/app/view-content/-components/ContentSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

function ContentProvider({children}) {
  return (
    
      <SidebarProvider>

      
      <ContentSidebar />
      <div className='flex flex-col w-full'>
        <ContentHeader/>
         <div>
        {children}
       
      </div>
      </div>
      
     
      
      </SidebarProvider>
    
  )
}

export default ContentProvider