import React from 'react'
import { useSearchParams } from 'next/navigation'
import VerifyToken from '@/components/VerifyToken'

async function Page() {

  return (
    <VerifyToken />
  )
}

export default Page