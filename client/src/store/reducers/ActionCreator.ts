import { ActionCreator } from 'redux';
import {IList} from '../../models/IList';
import { userSlice } from './UserSlice';
import { AppDispatch } from '../store';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


// 
// export const fetchUsers = () => async (dispatch: AppDispatch) => {

//     try {
//         dispatch(userSlice.actions.usersFetching());

//         const response = await axios.get<IList[]>('http://localhost:5000/list')

//         dispatch(userSlice.actions.usersFetchingSuccess(response.data))

//     } catch (error) {
        
//         dispatch(userSlice.actions.usersFetchingError());
//     }   

// }
// 

export const fetchLists = createAsyncThunk(
    'list/fetchLists',
    async () => {
        try {
            const response = await axios.get<IList[]>('http://localhost:5000/list')
            return response.data;
        }
        catch (error) {
           throw error;
        }




    }
)


