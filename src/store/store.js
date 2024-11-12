import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice"
import feedReducer from "./slices/feedSlice";

export const store = configureStore({

    // number of slices depends on features of app
    reducer:{

        productSlice: productReducer,
        feedSlice : feedReducer,

    }
})