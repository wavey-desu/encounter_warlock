import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// import {AppDispatch} from "../store.ts";

export interface AppDefaultsState {
	sidebarOpen: boolean;
	addCharOpen: boolean;
	encounterPhase: number;
}

const initialState: AppDefaultsState = {
	sidebarOpen: true,
	addCharOpen: false,
	encounterPhase: 0
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
		},
		phaseNext(state) {
			state.encounterPhase++;
		},
		phasePrev(state) {
			state.encounterPhase--;
		},
		phaseReset(state) {
			state.encounterPhase = 0;
		},
	}
})

export const {setSideBarOpen, setAddCharOpen, phaseNext, phasePrev, phaseReset} = appDefaultsSlice.actions;
export default appDefaultsSlice.reducer