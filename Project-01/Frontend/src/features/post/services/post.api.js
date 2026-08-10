// API LAYER

import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// getFeed api
export async function getFeed(){

    try{
        const response = await api.get("/posts/feed")

        return response.data
    }
    catch(err){
        throw err
    }
}


// create post
export async function CreatePost(imageFile, caption){

    // we can't send two types of data like text and file together in an object as json so we create a FormData and append it in it
    const formData = new FormData()

    formData.append("image", imageFile)
    formData.append("caption", caption)

    const response = await api.post("/posts", formData)


    return response.data
}


// LikePost

export async function likePost(postId){
    const response = await api.post("/posts/like/" + postId)
    return response.data
}


//unLikePost

export async function unLikePost(postId){
    const response = await api.post("/posts/unlike/" + postId)

    return response.data
}