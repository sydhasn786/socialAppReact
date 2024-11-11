import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { collection, addDoc } from 'firebase/firestore';
export const createPost = createAsyncThunk(
"feed/createPost",
async (post) => {
    try{
        const collectionRef = collection(db,"posts")
        const response = await addDoc(collectionRef,post)
        console.log("response after firebase store", response)


    }catch(e){
        console.log("error", e)
    }
}
)