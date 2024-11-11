import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// API action jo api sy data ly kr atay hain.
// ye hum slice create krty huay nhi bna skty ic liye seprately bnaya

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log("response", data)
        return data;
    }
);

export const deleteProductApiAction = createAsyncThunk(
    "product/deleteProduct",
    async(id) => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`,
           { method: "DELETE"});

            const data = await response.json();

            console.log("data in deleteProduct action", data);

            return data;
        
    });

export const updateProductApiAction = createAsyncThunk(
        "product/updateProduct",
        async({ id, updatedProduct }) => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
    
            const data = await response.json();
            console.log("Updated product data", data);
            return data; // Return updated product data
        }
    );
    
export const addProductApiAction = createAsyncThunk(
    "product/addNewProduct",
    async(product) => {
        console.log("new product pass to add api",product)
        const response = await fetch(`https://fakestoreapi.com/products/`,
           {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
             },
             body: JSON.stringify(product)
            
            });

            const data = await response.json();
            console.log("add new product",data);
        
            return data;
        });

const productSlice = createSlice({
    name:'product',
    initialState:{
        products: [],
    },
    reducers:{
        setProducts:(state, action) =>{
           // console.log("get data",action.payload)
            state.products = action.payload;
        },
        // we are making component only action without api
   
        // name , sate, action.. action return payload
        deleteProduct:(state, action) =>{
            let id = action.payload;

            console.log("id in delete product action ",id)
            let filterProducts = state.products.filter(product => product.id != id);
            state.products = filterProducts;
        },

        addProduct : (state, action) => {
            console.log("action in add product", action.payload)
            state.products = [action.payload, ...state.products]
        }
       
    },
    extraReducers: builder => {
        builder
        .addCase(fetchProducts.fulfilled, (state, action) => {
          // console.log("get data",action.payload)
            state.products = action.payload;
        })

        .addCase(deleteProductApiAction.fulfilled, (state, action) =>{

            console.log("data in deleteProductAPI action in reducer", action.payload);

            let id = action.payload.id;

            let filterDeleteProducts = state.products.filter(product => product.id !== id);

            state.products = filterDeleteProducts;
        })

        .addCase(addProductApiAction.fulfilled, (state, action) => {

            console.log("data in addProductAPI action in reducer", action.payload);

            state.products = [action.payload, ...state.products];
        })

        .addCase(updateProductApiAction.fulfilled, (state, action) => {
            const updatedProduct = action.payload;
            const index = state.products.findIndex(product => product.id === updatedProduct.id);
            if (index !== -1) {
                state.products[index] = updatedProduct; // Update product in state
            }})
    }
});

export const {setProducts, deleteProduct, addProduct} = productSlice.actions;
export default productSlice.reducer;