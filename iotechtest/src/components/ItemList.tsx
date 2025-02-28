import { useItems, deleteItem } from "../api/api";
import { ItemComponent } from "./Item";
import { NewItemForm } from "./newItemForm";
import { Items } from "../types";
import { useEffect, useState } from "react";

export function ItemList(){
    const {items, error, loading, setitems} = useItems()
    const [order, setorder] = useState<'asc'|'desc'>('asc')

    const handleSort = (order:'asc'|'desc')=>{
        const sortedItems = items.slice().sort((a,b) => {
            if(order === 'asc'){
                return a.id - b.id
            }else{ return b.id-a.id}
        })
        setitems(sortedItems)
    }

    useEffect(() => {
      handleSort(order)
    }, [order,items])

    const toggleSortOrder = () => {
        setorder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    

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
            <button onClick={toggleSortOrder}>
                Sort by ID ({order === 'asc' ? 'Descending' : 'Ascending'})
            </button>
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