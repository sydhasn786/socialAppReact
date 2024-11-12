import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection,doc, deleteDoc,addDoc, getDocs , onSnapshot} from 'firebase/firestore';
import { db } from '../../config/firebase';

// Fetch posts from Firestore
export const getPosts = createAsyncThunk('feed/getPosts', async () => {
  try {
     const collectionRef = collection(db, 'posts');
    const docs = await getDocs(collectionRef);
    let data = [];
    docs.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // return data;

    // get real data

    // let data = []
    // // query snapshot is doc
    // onSnapshot(collectionRef,(querySnapshot) =>{
    //     querySnapshot.forEach((doc) =>{
    //       console.log("doc", doc.data());
    //       data = [...data,{ id: doc.id, ...doc.data()}]
    //     })
        
    //   });

      return data;




  } catch (e) {
    console.error('Error fetching posts:', e);
    throw e;
  }
});

export const updatePost = createAsyncThunk (
  "feed/updatePost",
  async (post) =>{
    try{

      const docRef = doc(db, "posts", post.id)
      await docRef.set

    }catch(e){
      console.error("Error updating post:", e);
    }
  }
)



export const deletePost = createAsyncThunk(
  "feed/deletePost",
async (id) =>{
  try{
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    return id
  }catch(error){
    console.error("Error deleting post:", error);
  }
})

// Create a new post in Firestore
export const createPosts = createAsyncThunk('feed/createPosts', async (post) => {
  try {
    const collectionRef = collection(db, 'posts');
    const response = await addDoc(collectionRef, post);
    return { id: response.id, ...post };
  } catch (e) {
    console.error('Error creating post:', e);
    throw e;
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    feed: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFeed: (state, action) => {
      console.log('action in addFeed', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getPosts success
      .addCase(getPosts.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.loading = false;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle createPosts success
      .addCase(createPosts.fulfilled, (state, action) => {
        state.feed = [action.payload, ...state.feed];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.feed = state.feed.filter((post) => post.id !== action.payload);
      })
  },
});


export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;
