'use client';
import { signIn } from 'next-auth/react'
import React from 'react'

export default function LoginView() {
  return (
    <div className='w-full pt-8 text-center'>
        <button 
            onClick={()=>signIn('google')}
            className='primary'
        >Login
        </button>
    </div>
  )
}
