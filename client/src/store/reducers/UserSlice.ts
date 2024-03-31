import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchLists } from './ActionCreator'
import { IList } from '../../models/IList'

interface ListState {
  lists: IList[]
  isLoading: boolean
  error: string
}

const initialState: ListState = {
  lists: [],
  isLoading: false,
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchLists.fulfilled,
        (state, action: PayloadAction<IList[]>) => {
          state.isLoading = false
          state.error = ''
          state.lists = action.payload
        },
      )
      .addCase(fetchLists.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchLists.rejected, (state) => {
        state.isLoading = false
        state.error = 'Error fetching users'
      })
  },
})

export default userSlice.reducer
