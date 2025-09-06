import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSendingOtp: false,
  isVerifyingOtp: false,
	isUserLoggedIn: false,
	idToken: undefined
};

const signupSlice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		setIsSendingOtp: (state, action) => { state.isSendingOtp = action.payload; },
		setIsVerifyingOtp: (state, action) => { state.isVerifyingOtp = action.payload; },
		setIsUserLoggedIn: (state, action) => { state.isUserLoggedIn = action.payload; },
  },
})

export const {
	setIsSendingOtp, setIsVerifyingOtp, setIsUserLoggedIn
} = signupSlice.actions

export default signupSlice.reducer