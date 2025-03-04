'use client'
import React from 'react'
import { createBoard } from '@/app/actions/boardAction';
import { redirect } from 'next/navigation';

export default function NewBoardPage() {


  async function handleNewBoardSubmit(formData:FormData){
    const boardName=formData.get('name')?.toString() || "";
    const roominfo=await createBoard(boardName);
    if(roominfo){
      redirect(`/boards/${roominfo.id}`);
    }
  }
  return (
    <form action={handleNewBoardSubmit} className='max-w-xs block'>
        <h1 className='text-2xl mb-4'>Create New Board:</h1>
        <input type="text" name="name" placeholder='board name'/>
        <button type='submit' className='primary w-full mt-2'>
          Create board
        </button>
    </form>
  )
}
