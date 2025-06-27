'use server'
import { liveblocksClient } from '@/lib/liveblocksClient'
import React from 'react'
import NewBoardAccess from '@/components/forms/NewBoardAccessForm'
import getUserEmail from '@/lib/getUserEmail'
import Link from 'next/link'
import EmailAccessList from '@/components/EmailAccessList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import BoardDeleteButton from '@/components/BoardDeleteButton'

type PageProps={
  params: Promise<{
    boardId:string;
    cardId:string;
  }>
};

export default async function BoardSettings(props:PageProps) {
  const params = await props.params;
  const boardId= params.boardId;
  const boardInfo=await liveblocksClient.getRoom(boardId);
  const userEmail=await getUserEmail();
  if(!boardInfo.usersAccesses[userEmail]){
    return "Access Denied!"
  }


  return (
    <div >
      <div className='flex justify-between'>
        <Link href={`/boards/${boardId}`} className='inline-flex items-center gap-1 mb-4 btn'>
          <FontAwesomeIcon icon={faArrowLeft} className='h-5 w-5'></FontAwesomeIcon>
          Go back to board
        </Link>
          <BoardDeleteButton boardId={boardId}/>
      </div>
        <h1 className='text-2xl'>Access to board {boardInfo.metadata.boardName}:</h1>
          <EmailAccessList emails={Object.keys(boardInfo.usersAccesses)} boardId={boardId}></EmailAccessList>
          <NewBoardAccess boardId={boardId}></NewBoardAccess>
    </div>
    
  )
}

