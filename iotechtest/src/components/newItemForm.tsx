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

    async function submitHandler() {
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
        <form onSubmit={submitHandler}>
            {error && <p>{error}</p>}
            <input type="text" placeholder="title" value={title} onChange={i => setTitle(i.target.value)}/>
            <textarea placeholder="Description" value={body} onChange={i => setbody(i.target.value)}></textarea>
            <button type="submit">Add Item</button>
        </form>
    )
}