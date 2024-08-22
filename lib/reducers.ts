import {combineReducers} from "redux";
import defaultsReducer from './slices/appDefaults'
import encounterReducer from './slices/storageManager'

const rootReducer = combineReducers({
	appDefaults: defaultsReducer,
	encounterReducer: encounterReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;