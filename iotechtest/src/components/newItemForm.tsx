import { useState } from "react";
import { createItem } from "../api/api";
import { Items } from "../types";

type newItemFormProp={
    onadd:(item:Items) => void
}

export function NewItemForm(props:newItemFormProp){
    const {onadd}=props
    const [title, setTitle] = useState<string>("")
    const [body, setbody] = useState("")
    const [error, seterror] = useState("")

    async function submitHandler(e:any) {
        e.preventDefault()
        if(!title||!body){
            seterror("Please enter both Title and Description")
        }
        try {
            const newItem = await createItem({title,body})
            onadd(newItem)
            setTitle("")
            setbody("")
            seterror("")
        } catch (error:any) {
            seterror(error.message||"error creating item")
        }

    }

    return(
        <form onSubmit={submitHandler} className="pr-4 pb-4 mb-4 flex-colp-4 border rounded shadow flex flex-col space-y-4 bg-gray-300 w-1/3">
            {error && <p className="text-red-500">{error}</p>}
            <input type="text" placeholder="title" value={title} onChange={i => setTitle(i.target.value)} className="w-full p-4 m-2 rounded"/>
            <textarea placeholder="Description" value={body} onChange={i => setbody(i.target.value)} className="w-full p-4 m-2 rounded"></textarea>
            <button type="submit" className="p-4 border bg-gray-700 mx-2 rounded w-1/4 text-white">Add Item</button>
        </form>
    )
}