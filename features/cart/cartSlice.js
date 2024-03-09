import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [{ id:1 , details:{} , quantity:1}],
  cartValue:0,
};

export const cartSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const tofinditem = state.cartItems.find(item => item.details.id === action.payload.id)
      if(tofinditem){
        tofinditem.quantity=tofinditem.quantity+1
      }
      else{
        const item = {
          id: nanoid(),
          details: action.payload,
          quantity:1,
        };
        state.cartItems.push(item);
      }
      state.cartValue= state.cartValue+Math.floor(action.payload.price - (action.payload.discountPercentage * action.payload.price) / 100)
    },
    removeItem: (state, action) => {
      const removedItem = state.cartItems.find(item => item.id === action.payload);
      if (removedItem.quantity===1) {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
      else{
        removedItem.quantity-=1
      }
      state.cartValue -= (Math.floor(removedItem.details.price - (removedItem.details.discountPercentage * removedItem.details.price) / 100))
    },
    dropItem: (state,action)=>{
      const removedItem = state.cartItems.find(item => item.id === action.payload);
      state.cartValue -= removedItem.quantity*(Math.floor(removedItem.details.price - (removedItem.details.discountPercentage * removedItem.details.price) / 100))
      state.cartItems= state.cartItems.filter(item => item.id !== action.payload)
    }
  },
});

export const { addItem, removeItem ,dropItem } = cartSlice.actions;
export default cartSlice.reducer;
