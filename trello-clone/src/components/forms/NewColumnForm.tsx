'use client'

import { LiveObject } from '@liveblocks/client';
import { useMutation } from '@/app/liveblocks.config';
import React, {FormEvent} from 'react'
import uniqid from 'uniqid';

export default function NewColumnForm() {
   const addColumn=useMutation(({storage},columnName)=>{
    return storage.get('columns').push(new LiveObject({
      name:columnName,
      id:uniqid.time(),
      index:9999,
    }))
  },[])
  
  function handleNewColumn(ev:FormEvent){
      ev.preventDefault();
      const input=(ev.target as HTMLFormElement).querySelector('input');
      if(input){
        const columnName=input?.value;
        addColumn(columnName);
        input.value='';
      }
  }

  return (
    <form onSubmit={handleNewColumn} className='max-w-xs'>
        <label className='block mb-2  flex-col'>
            <span>Column Name:</span>
            <input type="text" placeholder='column name' />
        </label>
        <button type='submit' className='block w-full'>Create Column</button>
    </form>
  )
}
