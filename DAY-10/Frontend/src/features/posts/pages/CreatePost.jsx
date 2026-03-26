import React, { useRef, useState } from 'react'
import '../style/createPost.scss'
import { usePost } from '../hook/usePost';
import { useNavigate } from 'react-router';
// import "../../shared/button.scss"

const CreatePost = () => {
    const navigate = useNavigate()
    const [caption,setCaption] = useState("");
    const postImageinputFieldRef = useRef(null);

    const {loading,handleCreatePost} = usePost();

    async function handleSubmit(e){
        e.preventDefault();

        const file = postImageinputFieldRef.current?.files?.[0];
        if(!file){
            return;
        }

        await handleCreatePost(file,caption);

        navigate('/');

    }
    if(loading){
        return (
            <main>
                <h1>creating post</h1>
            </main>
        )
    }
  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label className='post-image-label' htmlFor="postImage">select Image</label>
                <input ref={postImageinputFieldRef} hidden type="file" name='postImage' id='postImage' accept="image/*" />
                <input value={caption} onChange={(e)=>{setCaption(e.target.value)}} type="text" placeholder='enter caption' name='caption' id='caption' />
                <button className='button primary-button'>Create Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost
