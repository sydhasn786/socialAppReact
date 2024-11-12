import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { collection, addDoc } from 'firebase/firestore';
import {db} from "../../config/firebase.js"
import { getDocs } from 'firebase/firestore';
export const getPosts = createAsyncThunk(
    "feed/getPosts",
    async () => {
        try{

            const collectionRef = collection(db, "posts")
            const docs = await getDocs(collectionRef)
            let data = []
            docs.forEach((doc) => {
                data.push({
                    id:doc.id,
                    ...doc.data()
                })
            });

            return data;


        }catch(e){

        }
    }
)




export const createPosts = createAsyncThunk(
"feed/createPosts",
async (post) => {
    try{
        const collectionRef = collection(db,"posts")
        const response = await addDoc(collectionRef,post)
        console.log("response after firebase store", response)


    }catch(e){
        console.log("error", e)
    }
    return post
}
)

const feedSlice = createSlice({
    name : "feed",
    initialState : {
        feed : [],

    },
    reducers:{
        addFeed : (state, action) => {
            console.log("action in addFeed", action.payload)

        }
    },

    extraReducers : (builder) => {
        builder.addCase(createPosts.fulfilled, (state, action) => {
            console.log("data in getPosts action in reducer", action.payload);
            state.feed = [action.payload, ...state.feed];
        })
    }
})

export const {addFeed} = feedSlice.actions;
export default feedSlice.reducer;