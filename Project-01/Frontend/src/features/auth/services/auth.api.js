// API Layer

// all codes related to communicating with backend for authentication goes here

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true
});

// register API
export async function register(username, email, password){

    try{
        const response = await api.post(
          "/register", {
            username,
            email,
            password
          });

          return response.data

    }
    catch(err){
        throw err
    }
}


// Login API
export async function login(username, password){

    try {
      const response = await api.post(
        "/login",
        {
          username,
          password
        });

        return response.data

    }
    catch (err) {
      throw err;
    }
}



// getMe API

export async function getMe(){

    try{
        const response = await api.get("/get-me")

        return response.data
    }
    catch(err){
        throw err
    }
}

