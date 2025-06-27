'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function LogInButton() {
  return (
    <div>
        <button className='bg-slate-300 py-2 px-4 ml-2 rounded-sm'
            onClick={()=>signIn('google')}>
                Login
        </button>
    </div>
  )
}
