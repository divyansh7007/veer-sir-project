import React from 'react'

function InformationProvider() {
  return (
    <div className='sticky w-[20.5rem] right-7 bottom-4 bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-lg cursor-text shadow-xl flex items-center justify-center flex-col'><div>If You have any query?</div><div className='hover:font-bold cursor-pointer'>Contact us on +91{process.env.NEXT_PUBLIC_PHONE_NUMBER}</div></div>
  )
}

export default InformationProvider