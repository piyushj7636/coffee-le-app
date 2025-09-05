import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isSendingOtp: false,
  isVerifyingOtp: false,
	isUserLoggedIn: false
}

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setIsSendingOtp: (state, action) => { state.isSendingOtp = action.payload; },
		setIsVerifyingOtp: (state, action) => { state.isVerifyingOtp = action.payload; },
		setIsUserLoggedIn: (state, action) => { state.isUserLoggedIn = action.payload; },
	}
})

export const {
	setIsSendingOtp, setIsVerifyingOtp, setIsUserLoggedIn
} = loginSlice.actions

export default loginSlice.reducer