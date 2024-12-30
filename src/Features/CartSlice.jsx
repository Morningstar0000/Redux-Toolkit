import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const useLocalData = false;

const url = 'https://www.course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  try {
    if (useLocalData) {
      return cartItems; // Replace with local mock data
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
});

const initialState = {
    cartItems: [],
    amount: 0,
  total: 0,
  isLoading: true,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      clearCart: (state) => {
        state.cartItems = [];
      },
     removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) =>item.id !== itemId)

     },
     increase: (state,{payload}) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem) {
        cartItem.amount += 1; // Increment the amount property
      }
    console.log(cartItem);
    
     },
     decrease: (state,{payload}) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem) {
        cartItem.amount - 1; // Increment the amount property
      };
      if (cartItem.amount > 1) {
        cartItem.amount -= 1;
      }
     },
     calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      });
      state.amount = amount
      state.total = total
     }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getCartItems.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
          console.log('Fetched cart items:', action.payload); // Log fetched items
          state.isLoading = false;
          state.cartItems = action.payload;
        })
        .addCase(getCartItems.rejected, (state) => {
          state.isLoading = false;
        });
    },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;



export default cartSlice.reducer;