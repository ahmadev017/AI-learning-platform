
import React from 'react'
import WorkspaceProvider from './Provider'

function Layout({children}) {
  return (
   
      <WorkspaceProvider>
        {children}
      </WorkspaceProvider>
      
    
  )
}

export default Layout
