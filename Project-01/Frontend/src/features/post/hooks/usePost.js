// HOOK LAYER

import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { getFeed, CreatePost, likePost, unLikePost } from "../services/post.api";



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


    // create post
    const handleCretePost = async (imageFile, caption)=>{

        setLoading(true)

        try{
            const data = await CreatePost(imageFile, caption)

            setFeed([data.post, ...feed])  // set the current post created and rest of the feed

            return data
        }
        catch(err){
            throw err
        }finally{
            setLoading(false)
        }

        
    }


    // like a post

    const handleLike = async (postId)=>{

        const data = await likePost(postId)
        await handleGetFeed() // to update ui
        
    }

    // unlike a post

    const handleUnLike = async (postId) => {
      const data = await unLikePost(postId);
      handleGetFeed() // to update the ui
    };


    return {loading, feed, post, handleGetFeed, handleCretePost, handleLike, handleUnLike}
}