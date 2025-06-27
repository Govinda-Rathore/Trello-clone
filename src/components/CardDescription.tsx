// import { useParams } from "next/navigation"
// import { useEffect, useState } from "react";
// import { useRoom } from "@liveblocks/react";
// import {Doc} from "yjs";
// import {LiveblocksYjsProvider} from "@liveblocks/yjs";
// import { CollaborativeEditor } from "./DescriptionEditor";

// export default function CardDescription(){
//     const {cardId}=useParams();
//     const room=useRoom();

//     const [doc,setDoc]=useState<Doc|null>(null);
//     // const [provider,setProvider]=useState<LiveblocksYjsProvider<any,any,any,any>|null>(null);

//     useEffect(()=>{
//         const yDoc=new Doc()
//         const yProvider=new LiveblocksYjsProvider(room,yDoc);
//     },[room])

//     return (
//         <div>
//             <CollaborativeEditor></CollaborativeEditor>
//         </div>
//     )
// }