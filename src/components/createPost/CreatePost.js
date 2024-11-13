import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPosts, updatePost } from '../../store/slices/feedSlice';
import Button from '../button/Button';
import firebase from 'firebase/compat/app';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {storage} from '../../config/firebase'
export default function CreatePost() {
 
    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("")
    const [imageURL, setImageURL] = useState(null);
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
            imageURL : "https://www.google.com/url?sa=i&url=https%3A%2F%2Flogos-world.net%2Fgoogle-photos-logo%2F&psig=AOvVaw0gMoAmeFoREC5g9WPWrCFx&ust=1731571418413000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPig9eXs2IkDFQAAAAAdAAAAABAE"
        }

        if (post){
            dispatch(updatePost({...postData, id: post.id}))
            return 
        }
        dispatch (createPosts(postData))
         
     

    }

    const uploadImage = async (e) =>{

     try{

        const file = e.target.files[0]
        console.log("Image", file);
       
       const fileRef= ref(storage,'images/' + file.name)
       const metadata = {
        contentType : 'image/png'
        };
      
      
       
       
        const response = await  uploadBytes(storage,file, metadata)
       
       console.log("response", response)
       
        const url = await getDownloadURL(fileRef)

        console.log("url",url)
    

     }catch(e){
        console.log("error",e)

     }
      
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
