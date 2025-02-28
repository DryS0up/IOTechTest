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
        <div className="container mx-auto p-4">
            <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Item List</h1>
            <button onClick={toggleSortOrder} className="border bg-gray-700 p-5 rounded-xl shadow text-white ">
                Sort by ID ({order === 'asc' ? 'Descending' : 'Ascending'})
            </button>
            </div>
            
            <NewItemForm onadd={handleAdd}/>
            {loading && <p>Loading Items ... </p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
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