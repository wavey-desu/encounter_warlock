import {combineReducers} from "redux";
import defaultsReducer from './slices/appDefaults'

const rootReducer = combineReducers({
	appDefaults: defaultsReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;