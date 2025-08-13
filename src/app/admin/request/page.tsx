import AllRequest from '@/components/AllRequest'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { unstable_noStore as noStore } from 'next/cache'
import React from 'react'

export const metadata : Metadata={
  title:"All Request"
}

const page = async() => {
  noStore()
  const allFarmRequest = await prisma.request.findMany({
    include:{
      User:true
    }
  })
  return (
    <div><AllRequest allFarmRequest={allFarmRequest} /></div>
  )
}

export default page