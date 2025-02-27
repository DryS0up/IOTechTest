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
  
export const createItem = async (items:{title:string,body:string}) => {
    
}