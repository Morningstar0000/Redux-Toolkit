import {configureStore } from "@reduxjs/toolkit"
import cartReducer from "./Features/CartSlice"
import modalReducer from "./Features/ModalSlice"

export const store = configureStore({
    reducer:{
        cart : cartReducer,
        modal: modalReducer
    }
})