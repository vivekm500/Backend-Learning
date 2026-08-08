// API LAYER

import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

// getFeed api
export async function getFeed(){

    try{
        const response = await api.get("/feed")

        return response.data
    }
    catch(err){
        throw err
    }
}