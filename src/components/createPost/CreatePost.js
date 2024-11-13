import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPosts, updatePost } from '../../store/slices/feedSlice';
import Button from '../button/Button';
export default function CreatePost() {
 
    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("")
    
    const post = useSelector(store => store.feedSlice.updatePost)
  
    const dispatch = useDispatch()
 console.log("post", post)
    useEffect(()=>{
        if(post){
            setTitle(post.title);
            setDescription(post.description)
        }else{
            setTitle("");
            setDescription("");
        }
    },[post])
    const createPostHandler =() =>{
        console.log("title", title);
        let postData = {
            title,
            description,
            createdAt: new Date(),
            imageURL : "https://via.placeholder.com/150"
        }

        if (post){
            dispatch(updatePost({...postData, id: post.id}))
            return 
        }
        dispatch (createPosts(postData))
         
     

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
    <Button title = {post ? "UpdatePost" : "Create Post"}onClickHandler={createPostHandler}/>
    
    </>

  )
}
