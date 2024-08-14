import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// import {AppDispatch} from "../store.ts";

export interface AppDefaultsState {
	open: boolean;
}

const initialState: AppDefaultsState = {
	open: true
}

const appDefaultsSlice = createSlice({
	name: "appDefaults",
	initialState,
	reducers: {
		setOpen: (state, action: PayloadAction<boolean>) => {
			state.open = action.payload
		}
	}
})

export const {setOpen} = appDefaultsSlice.actions;
export default appDefaultsSlice.reducer