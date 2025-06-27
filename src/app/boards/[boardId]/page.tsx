'use server'
import getUserEmail from "@/lib/getUserEmail";
import { liveblocksClient } from "@/lib/liveblocksClient";
import Board from "@/components/Board";

type PageProps={
    params: Promise<{
        boardId:string;
        cardId:string;
    }>
}; 

export default async function BoardPage(props:PageProps) {
    const params = await props.params;
    const {boardId}= params;
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