import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Billing() {
  return (
    <div className='p-10'>
      <h2 className='font-bold mb-5 text-3xl'>Select Plan</h2>
      <div className='z-99'>
        <PricingTable/>
      </div>
      
    </div>
  )
}

export default Billing
