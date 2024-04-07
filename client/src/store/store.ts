import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { listApi } from '../services/ListService'
import { taskApi } from '../services/TaskService'
import { boardApi } from '../services/BoardService'
import { activityApi } from '../services/ActivityService'
const rootReducers = combineReducers({
  [listApi.reducerPath]: listApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [activityApi.reducerPath]: activityApi.reducer,
  [boardApi.reducerPath]: boardApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        listApi.middleware,
        taskApi.middleware,
        activityApi.middleware,
        boardApi.middleware,
      ),
  })
}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
