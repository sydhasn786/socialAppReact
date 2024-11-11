import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice"
export const store = configureStore({

    // number of slices depends on features of app
    reducer:{

        productSlice: productReducer,

    }
})