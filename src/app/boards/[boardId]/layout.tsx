'use client';
import { BoardContextProvider } from "@/components/BoardContext"
import { RoomProvider } from "@/app/liveblocks.config";
import { useParams } from "next/navigation";
import React from "react"
import { LiveList } from "@liveblocks/core";

type PageProps={
    children:React.ReactNode,
    modal:React.ReactNode,
}
export default function BoardLayout({children,modal}:PageProps){
    const params=useParams();
    return (
        <BoardContextProvider>
            <RoomProvider
                id={params.boardId?.toString() || ""}
                initialPresence={{}}
                initialStorage={{
                    columns:new LiveList([]),
                    cards:new LiveList([]),
                }}
            >
                {children}
                {modal}
            </RoomProvider>
        </BoardContextProvider>
    );
}