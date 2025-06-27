'use client'
import Link from "next/link"
import PresenceAvatars from "./PresenceAvatars"
import { RoomData } from "@liveblocks/node"
import { RoomProvider } from "@/app/liveblocks.config"
import { LiveList } from "@liveblocks/client"

export default function BoardsTiles({boards}:{boards:RoomData[]}){
    return(
        <>
        <div className="relative my-4 grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {boards.length>0 && boards.map(board=>(
                <Link
                 className="bg-gray-200 px-4 py-8 rounded-md block relative"
                 href={`boards/${board.id}`}
                 key={board.id}>
                    {board.metadata.boardName}
                    <RoomProvider id={board.id} initialPresence={{}} initialStorage={{
                columns: new LiveList([]),
                cards:new LiveList([]),
              }}>
                        <div className="absolute bottom-1 right-1">
                            <PresenceAvatars presenceKey={'boardId'} presenceValue={board.id}/>
                        </div>
                    </RoomProvider>
                </Link>
            ))
            }
        </div>
        </>
    )
}