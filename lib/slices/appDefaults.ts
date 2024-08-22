import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// import {AppDispatch} from "../store.ts";

export interface AppDefaultsState {
	sidebarOpen: boolean;
	addCharOpen: boolean
}

const initialState: AppDefaultsState = {
	sidebarOpen: true,
	addCharOpen: false
}

const appDefaultsSlice = createSlice({
	name: "appDefaults",
	initialState,
	reducers: {
		setSideBarOpen: (state, action: PayloadAction<boolean>) => {
			state.sidebarOpen = action.payload
		},
		setAddCharOpen: (state, action: PayloadAction<boolean>) => {
			state.addCharOpen = action.payload
		}
	}
})

export const {setSideBarOpen, setAddCharOpen} = appDefaultsSlice.actions;
export default appDefaultsSlice.reducer