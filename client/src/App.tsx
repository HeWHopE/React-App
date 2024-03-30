import React, { useEffect } from 'react';

import './App.css';
import { useSelector } from 'react-redux';
import { useAppSelector } from './hooks/useAppDispatch';
import { userSlice } from './store/reducers/UserSlice';
import { useAppDispatch } from './hooks/useAppDispatch';
import { fetchLists } from './store/reducers/ActionCreator';
import MyButtons from './components/MyButtons';

import ListContainer from './components/listContainer';

function App() {

  const {lists, isLoading, error} = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

 useEffect(() => {
    dispatch(fetchLists());
}, [])

  return (
    <div className="App">
        <MyButtons />
            <ListContainer />
    </div>
  );
}

export default App;
