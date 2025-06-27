'use client';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation';
import { removeEmailFromBoard } from '@/app/actions/boardActions';

export default function EmailAccessList({emails,boardId}:{emails:string[],boardId:string}) {
    const router=useRouter();
    async function handleDelete(email:string){
        await removeEmailFromBoard(boardId,email);
        router.refresh();
    }
  return (
    <div className='mb-8'>
        {emails.map(email=>(
          <div key={email} className='border max-w-xs flex justify-between items-center pl-2 mb-2 rounded-md'>
            {email}
            <button className='btn' onClick={()=>handleDelete(email)} >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
  )
}
