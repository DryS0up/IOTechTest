import { Items } from "../types";
import { updateItem } from "../api/api";
import { useState } from "react";

type ItemProp={
    item:Items,
    onDelete:(id:number)=> void,
    onUpdate:(updatedItem:Items)=>void
}

export function ItemComponent(props:ItemProp){
    const {item,onDelete,onUpdate}=props
    const [isEditing, setisEditing] = useState(false)
    const [editTitle, seteditTitle] = useState(item.title)
    const [editBody, seteditBody] = useState(item.body)
    const [error, seterror] = useState<string>("")

    async function updateHandler() {
        try {
            const updatedItem = await updateItem(item.id,{title:editTitle, body:editBody})
            onUpdate(updatedItem)
            setisEditing(false)
        } catch (error:any) {
            seterror(error.message || "Failed to update item")
        }
    }
    
    if(isEditing){
        return (
            <div>
                {error && <p>{error}</p>}
                <input type="text" value={editTitle} onChange={e=> seteditTitle(e.target.value)}/>
                <textarea value={editBody} onChange={e => seteditBody(e.target.value)}></textarea>
                <button onClick={updateHandler}>Save</button>
                <button onClick={()=>setisEditing(false)}>Cancel</button>
            </div>
        )
    }
    return(
        <div>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <div>
                <button onClick={()=>setisEditing(true)}>Edit</button>
                <button onClick={()=> onDelete(item.id)}>Delete</button>
            </div>
        </div>
    )
}
