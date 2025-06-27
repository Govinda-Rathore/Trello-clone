import React, { FormEvent,useState} from 'react'
import { ReactSortable } from "react-sortablejs";
import { Card, useMutation, useStorage } from '@/app/liveblocks.config';
import { shallow } from '@liveblocks/client';
import NewCardForm from './forms/NewCardForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons';
import {default as ColumnCard} from '@/components/Card'
import CancelButton from './CancelButton';

type ColumnProps={
    id:string;
    name:string;  
};
 
export default function Column({id,name}:ColumnProps) {
    const[renameMode,setRenameMode]=useState(false);

    const columnCards=useStorage<Card[]>(root=>{
        return root.cards
                    .filter(card=>card.columnId===id)
                    .map(c=>({...c}))
                    .sort((a,b)=>a.index-b.index);
    },shallow);

    const updateCard=useMutation(({storage},index,updateData)=>{
        const card=storage.get('cards').get(index)
        if(card){
            for(const key in updateData){
                card?.set(key as keyof Card,updateData[key]);
            }
        }
    },[])

    const setCardsForColumn=useMutation(({storage}, sortedCards:Card[], newColumnId) => {
        const idsOfSortedCards = sortedCards.map(c => c.id.toString());
        const allCards:Card[] = [...storage.get('cards').map(c => c.toObject())];
        idsOfSortedCards.forEach((sortedCardId, colIndex) => {
          const cardStorageIndex = allCards.findIndex(c => c.id.toString() === sortedCardId);
          updateCard(cardStorageIndex, {
            columnId: newColumnId,
            index: colIndex,
          });
        });
      }, []);

    const updateColumn=useMutation(({storage},id,newName)=>{
        const columns=storage.get('columns')
        columns.find(c=>c.toObject().id===id)?.set('name',newName);
    },[])

    const deleteColumn=useMutation(({storage},id)=>{
        const columns=storage.get('columns');
        const columnIndex=columns.findIndex(c=>c.toObject().id===id);
        columns.delete(columnIndex);
    },[])

    async function handleRename(ev:FormEvent){
        ev.preventDefault();
        const input=(ev.target as HTMLFormElement).querySelector('input');
        if(input){
            const newName=input.value;
            updateColumn(id,newName)
            setRenameMode(false);
        }
    }
   
    return (
    <div className='w-48 bg-white shadow-md rounded-md p-2'>
        {!renameMode && (
            <div className='flex justify-between'>
                <h3 >
                    {name}
                </h3>
                <button onClick={()=>setRenameMode(true)} className=' opacity-40'>
                    <FontAwesomeIcon  icon={faEllipsis}/>
                </button>
            </div>
        )}
        {renameMode && (
            <div>
                Edit name:
                <form onSubmit={handleRename}>
                    <input type="text" className='mb-2' defaultValue={name}/>
                    <button type='submit' className='w-full mb-2'>Save</button>
                </form>
                <button className='rounded-md mb-2 p-2 flex gap-2 w-full items-center justify-center text-white bg-red-500' 
                onClick={()=>deleteColumn(id)}>
                    <FontAwesomeIcon icon={faTrash}/>
                    Delete Column
                </button>
                <CancelButton onClick={()=>setRenameMode(false)}/>
            </div>
        )}
        {!renameMode && columnCards &&  (
            <>
            <ReactSortable 
                list={columnCards} 
                setList={(items: Card[])=>setCardsForColumn(items,id)} 
                group="cards"
                className='min-h-12'
                ghostClass='opacity-40'
            >
                {columnCards.map(card=>(
                    <ColumnCard key={card.id} id={card.id} name={card.name}></ColumnCard>
                ))}
            </ReactSortable>
            </>
        )}
        {!renameMode && (
            <>
                <NewCardForm columnId={id}></NewCardForm>
            </>
        )
        }
    </div>
  )
}
