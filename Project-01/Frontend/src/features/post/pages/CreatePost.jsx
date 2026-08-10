import React, { useState } from 'react'
import '../style/createPost.scss'
import { useRef } from "react";
import { usePost } from '../hooks/usePost';
import { useNavigate } from 'react-router'


// directly we can't style file type input so we created a label for that and now we can style the label

const CreatePost = () => {

    const [caption, setCaption] = useState("");

    const [image, setImage] = useState(null);

    const postImageInputFieldRef = useRef(null)

    const {loading, handleCretePost} = usePost()

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        
        const file = postImageInputFieldRef.current.files[0]

        await handleCretePost(file,caption)


        navigate("/")
    }

    if(loading){
        return (
            <main>
                <h1>Creating Post</h1>
            </main>
        )
    }

  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label className='post-image-page' htmlFor="postImage">Select Post</label>
                <input 
                ref={postImageInputFieldRef} hidden type="file" name='postImage' id='postImage' />

                <input value={caption}
                onChange={(e)=>{
                    setCaption(e.target.value)
                }}
                type="text" name='caption' id='caption' placeholder='enter caption' />

                <button type='submit' className='button primary-button'>Create Post</button>
            </form>
        </div>

    </main>
  )
}

export default CreatePost
