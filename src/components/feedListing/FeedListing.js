import React ,{useEffect} from 'react'
import Button from '../button/Button'
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, deletePost, updateDocId } from '../../store/slices/feedSlice';


export default function FeedListing() {
   const dispatch = useDispatch()
   const feed = useSelector(store => store.feedSlice.feed)
   useEffect(()=>{
 
    dispatch(getPosts())
   },[])
    const handleClick = () =>{
      
      console.log("clicked")
      dispatch(getPosts())
    
    };
    const handleDelete =(id) =>{

console.log("Get Post Clicked delete", id)
dispatch(deletePost(id))
    }
   
    const handleUpdate = (id) =>{
      console.log("Get Post Clicked update", id)
      dispatch(updateDocId(id))
    }
 
    return (
    <div>
        <h1>Feed Listing</h1>
        {/* <Button title = "Get Post" onClickHandler = {() => {handleClick()}}/> */}
        {
          feed?.map((post) => {
            return (
              <div key = {post?.id}>
                <h3>{post?.title}</h3>
                <p>{post?.description}</p>
                <button onClick={()=> handleDelete(post.id)}>Delete</button>
                <button onClick={()=> handleUpdate(post.id)}>Update</button>
             
              </div>
            )
          })
        }
    
    </div>
  )
} 
