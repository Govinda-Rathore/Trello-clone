'use client';

import { LiveblocksProvider } from "@liveblocks/react/suspense";
import {LiveList} from "@liveblocks/core"
import { ClientSideSuspense } from '@liveblocks/react';
import { RoomProvider } from '@/app/liveblocks.config';
import Columns from './Columns';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import BoardSettings from "@/app/boards/[boardId]/settings/page";
import { FormEvent, useState } from "react";
import { updateBoard } from "@/app/actions/boardAction";
import { useRouter } from "next/navigation";
import { BoardContextProvider } from "@/components/BoardContext";


export default function Board({name,id}:{name:string,id:string}) {
      const [renameMode,setRenameMode]=useState(false);
      const router=useRouter();

      async function handleRename(ev:FormEvent){
        ev.preventDefault();
        const input=(ev.target as HTMLFormElement).querySelector('input');
        if(input){
          const newName=input.value;
          
          await updateBoard(id,{metadata:{boardName:newName}})
          input.value='';
          setRenameMode(false);
          router.refresh();
        }
      }

      return (
        // <LiveblocksProvider publicApiKey="pk_dev_UZUMIh5FDFy1FL7DH27Ww8qFh1eCN975RPcuSfrzIJ_HOEFn303PC2OCDtCkD4dL">
          <BoardContextProvider>
            <RoomProvider
              id={id}
              initialPresence={{
                // cardId:null,
                // boardId:null
              }}
              initialStorage={{
                columns: new LiveList([]),
                cards:new LiveList([]),
              }}>
              <ClientSideSuspense fallback={(<div>Loading…</div>)}>{()=>(
                <>
                <div className="flex justify-between items-center mb-4 gap-2">
                  <div >
                    {!renameMode && (
                      <h1 className="text-2xl"
                      onClick={()=>setRenameMode(true)}>
                        Board: {name}
                      </h1>
                    )}
                    {renameMode && (
                      <form onSubmit={handleRename}>
                        <input type="text" defaultValue={name}/>
                      </form>

                    )}
                    </div>
                      <Link href={`/boards/${id}/settings`} 
                      className="btn flex gap-1 items-center">
                        <FontAwesomeIcon icon={faCog}/>
                        Board Settings
                      </Link>
                  </div>
                        <Columns></Columns>
                </>
              )}
              </ClientSideSuspense>
              
            </RoomProvider>
          </BoardContextProvider>
        // {/* </LiveblocksProvider> */}
  )
}
