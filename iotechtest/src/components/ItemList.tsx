import { useItems, deleteItem } from "../api/api";
import { ItemComponent } from "./Item";
import { NewItemForm } from "./newItemForm";
import { Items } from "../types";

export function ItemList(){
    const {items, error, loading, setitems} = useItems()
    async function handleDelete(id:number) {
        try {
            deleteItem(id)
            setitems(items.filter(item => item.id !==id))
        } catch (err:any) {
            console.log(err.message||"Could not add item") 
        }
    }

    function handleAdd(newItem:Items){
        setitems(items.concat(newItem))
    }

    function handleUpdate(updatedItem:Items){
        setitems(items.map(item=>{
            if(item.id === updatedItem.id){
                return updatedItem
            }
            return item
        }))
    }

    return (
        <div>
            <h1>Item List</h1>
            <NewItemForm onadd={handleAdd}/>
            {loading && <p>Loading Items ... </p>}
            {error && <p>{error}</p>}
            <div>
                {items.map(item=>(
                    <ItemComponent
                    key={item.id}
                    item = {item}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    />
                ))}
            </div>
        </div>
    )
}