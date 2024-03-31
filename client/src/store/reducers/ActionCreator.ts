import { ActionCreator } from 'redux'
import { IList } from '../../models/IList'
import { userSlice } from './UserSlice'
import { AppDispatch } from '../store'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const fetchLists = createAsyncThunk('list/fetchLists', async () => {
  try {
    const response = await axios.get<IList[]>('http://localhost:5000/list')
    return response.data
  } catch (error) {
    throw error
  }
})
