// HOOK LAYER

import { useContext } from "react";
import { PostContext } from "../post.context";
import { getFeed } from "../services/post.api";


export const usePost = ()=>{

    const context = useContext(PostContext)


    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handleGetFeed = async ()=>{

        setLoading(true)

        try{
        const data = await getFeed()
        setFeed(data.posts)
        }
        catch(err){
            throw err
        }finally{
            setLoading(false)
        }

        
    }

    return {loading, feed, post, handleGetFeed}
}