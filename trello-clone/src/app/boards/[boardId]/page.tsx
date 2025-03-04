'use server'
import getUserEmail from "@/lib/getUserEmail";
import { liveblocksClient } from "@/lib/liveblocksClient";
import Board from "@/components/Board";

type PageProps={
    params:{
        boardId:string;
    }
}; 

export default async function BoardPage({params}:PageProps){
    const boardId= (await params).boardId;
    const userEmail=await getUserEmail();
    const boardInfo=await liveblocksClient.getRoom(boardId);
    const userAccess=boardInfo.usersAccesses?.[userEmail];
    const hasAccess=userAccess && [...userAccess].includes("room:write");
    if(!hasAccess){
        return(
            <p>Access Denied</p>
        );
    }
    return (
        <div>
            <Board name={boardInfo.metadata.boardName.toString()} id={boardId}></Board>
        </div>
    )
}