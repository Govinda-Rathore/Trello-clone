'use client';
import {updateBoard} from "@/app/actions/boardActions";
import {RoomProvider, useMyPresence, useUpdateMyPresence} from "@/app/liveblocks.config";
import {BoardContextProvider} from "@/components/BoardContext";
import Columns from "@/components/Columns";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LiveList} from "@liveblocks/core";
import {ClientSideSuspense} from "@liveblocks/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {FormEvent, useEffect, useState} from "react";


export default function Board({name,id}:{name:string,id:string}) {
      const [renameMode,setRenameMode]=useState(false);
      const router=useRouter();
      const updateMyPresence=useUpdateMyPresence();

      useEffect(()=>{
        updateMyPresence({boardId:id});

        return () => {
          updateMyPresence({boardId:null});
        }
      },[])

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
          <BoardContextProvider>
            <RoomProvider
              id={id}
              initialPresence={{
                cardId:null,
                boardId:null
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
  )
}
