import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/UserSlice";
import { listApi } from "../services/ListService";


const rootReducers  = combineReducers({
    userReducer,
    [listApi.reducerPath]: listApi.reducer,
});


export const setupStore = () => {
        return configureStore({
            reducer: rootReducers,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listApi.middleware)
        });
    }

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];


