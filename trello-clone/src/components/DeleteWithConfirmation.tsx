'use client'
import { faArrowLeft, faTractor, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props={
    onDelete:()=>void;
}
export default function DeleteWithConfirmation({onDelete}:Props){
    const [wannaDelete,setWannaDelete]=useState(false)
    if(wannaDelete)
    {
        return(
            <div>
                <h4 className="mb-2 text-center">Are you sure?</h4>
                <div >
                    <div className=" grid grid-cols-2 gap-2">
                        <button 
                            className="btn block with-icon"
                            onClick={()=>setWannaDelete(false)}>
                            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                            No
                        </button>
                        <button 
                        className="red btn w-full with-icon"
                        onClick={onDelete}>
                            Yes, delete
                        </button>
                    </div>
                </div>
            </div>
        )
    };
    return(
        <button
            onClick={()=>setWannaDelete(true)}
            className="btn red w-full "
        >
            <FontAwesomeIcon icon={faTrash}/>
            Delete
        </button>
    )
}
