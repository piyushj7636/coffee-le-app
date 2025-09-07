import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	size: 'Medium',
	quantity: 1
};

const cartSlice = createSlice({
	name: 'Cart',
	initialState,
	reducers: {
		setSize: (state, action) => { state.size = action.payload; },
		setQuantity: (state, action) => { state.quantity = action.payload; }
  },
})

export const {
	setSize, setQuantity
} = cartSlice.actions

export default cartSlice.reducer