import { combineReducers } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice"
import loginReducer from "./loginSlice"
import cartReducer from "./cartSlice"

const reducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	cart: cartReducer,
})

export default reducer