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
            <div className="p-4 border rounded shadow flex flex-col space-y-4">
                {error && <p>{error}</p>}
                <input type="text" value={editTitle} onChange={e=> seteditTitle(e.target.value)} className="w-1/2 p-2 border rounded"/>
                <textarea value={editBody} onChange={e => seteditBody(e.target.value)} className="w-1/2 p-2 border rounded "></textarea>
                <div className="flex space-x-2">
                    <button onClick={updateHandler} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Save
                    </button>
                    <button onClick={() => setisEditing(false)} className="px-4 py-2 bg-gray-500 text-white rounded">
                        Cancel
                    </button>
                </div>

            </div>
        )
    }
    return(
        <div className="p-4 border rounded shadow">
            <div className="flex mb-4 font-bold">
            <p className="mr-1 text-xl">{item.id}</p>
            <p>|</p>
            <h2 className="mx-1 text-xl">{item.title}</h2>
            </div>
            <p className="mb-4 mr-10">{item.body}</p>
            <div>
                <button onClick={()=>setisEditing(true)} className="px-4 py-2 bg-gray-500 text-white rounded shadow mx-1">Edit</button>
                <button onClick={()=> onDelete(item.id)} className="px-4 py-2 bg-red-500 text-white rounded shadow mx-1">Delete</button>
            </div>
        </div>
    )
}
