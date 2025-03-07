import { useState, useEffect} from "react"
import {Items} from "../types"

const API_URL = "https://jsonplaceholder.typicode.com/posts"


//Hook for fetching items using useEffect
export const useItems = () => {
    const [items, setitems] = useState<Items[]>([])
    const [error, seterror] = useState<string | null>(null)
    const [loading, setloading] = useState<boolean>(true)

    useEffect(() => {
      const fetchItems = async () => {
        try {
            const response = await fetch(API_URL)
            if(!response.ok){
                throw new Error("Fetch Items Failed.")
            }
            const data:Items[] = await response.json()
            setitems(data)
        } catch (error: any) {
            seterror(error.message || 'Error fetching Items')
        }finally{
            setloading(false)
        }
      }
      fetchItems()
      }, [])
    return{items,error,loading,setitems}
}
 

//API function to create a new Item
export const createItem = async (items:{title:string,body:string}) => {
    const response = await fetch(API_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(items)
    })
    if(!response.ok){
        throw new Error("Failed to Create Item")
    }
    return response.json()
}

//API function to update existing Item
export const updateItem = async (id:number, items:{title:string,body:string}) => {
    const response = await fetch(`${API_URL}/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(items)
    })
    if(!response.ok){
        throw new Error("Failed to update Item")
    }
    const updatedItem = await response.json()
    return updatedItem
}

//API function to delete an Item
export const deleteItem = async (id:number) => {
    const response = await fetch(`${API_URL}/${id}`,{
        method:'DELETE'
    })
    if (!response.ok){
        throw new Error("Failed to delete item")
    }
    return response.ok
}

