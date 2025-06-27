import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth'
import React from 'react'
import LogOutButton from './LogOutButton';
import LogInButton from './LogInButton';
import Link from 'next/link';

export default async function Header() {
    const session=await getServerSession(authOptions);
  return (
        <header className="p-4 bg-gray-200 px-8">
            <div className='flex justify-between items-center'>
                    <Link href="/" className='logo font-medium text-2xl italic'>Collab Board</Link>
                <div className='flex items-center'>
                    {session && (
                        <>
                            Hello, {session?.user?.name}
                            <LogOutButton></LogOutButton>
                        </>
                    )}
                    {!session && (
                        <>
                            Not logged in
                            <LogInButton></LogInButton>
                        </>
                    )}
                </div>
            </div>
        </header>
  )
}
