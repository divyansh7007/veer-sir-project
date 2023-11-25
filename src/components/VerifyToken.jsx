'use client';
import React from 'react'
import { useSearchParams } from 'next/navigation';

function VerifyToken({ children }) {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    const expire = searchParams.get('expire');
  return (
    <div></div>
  )
}

export default VerifyToken