import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
export default function CreatePost() {
 
    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("")
    const dispatch = useDispatch()
 
    const createPostHandler =() =>{
        console.log("title", title);
        let post = {
            title,
            description,
            createdAt: new Date(),
            imageURL : "https://via.placeholder.com/150"
        }

        dispatch (createPost(post))
         
     

    }

    const uploadImage = (e) =>{
        console.log("Image", e.target.files[0]);

    }
    return (
        <>
    <div>Create Post</div>
    <input type = "text" placeholder = "Title" onChange = {(e)=>{setTitle(e.target.value)}} value = {title}/>
    <br/>
    <textarea placeholder = "Description" onChange = {(e)=>setDescription(e.target.value)} value = {description}></textarea>
    <br/>
    <input type = "file" onChange = {uploadImage}/>
    <br/>
    <button onClick = {createPostHandler}>Create Post</button>
    
    </>

  )
}
