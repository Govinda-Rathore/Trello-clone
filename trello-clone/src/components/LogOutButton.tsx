'use client'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function LogOutButton() {
  return (
    <div>
        <button 
        onClick={
          ()=>signOut({ callbackUrl: 'http://localhost:3000' })}
        className='bg-slate-300 py-2 px-4 ml-2 rounded-sm items-center'
        >  
            LogOut
            <FontAwesomeIcon className='ml-1' icon={faRightFromBracket}/>
        </button>
    </div>
  )
}
