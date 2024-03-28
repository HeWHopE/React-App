import React, { useEffect } from 'react';

import './App.css';
import { useSelector } from 'react-redux';

import { useAppSelector } from './hooks/useAppDispatch';
import { userSlice } from './store/reducers/UserSlice';

  import { useAppDispatch } from './hooks/useAppDispatch';
import { fetchLists } from './store/reducers/ActionCreator';


import ListContainer from './components/listContainer';

function App() {

  const {lists, isLoading, error} = useAppSelector(state => state.userReducer);

  const dispatch = useAppDispatch();

 useEffect(() => {
    dispatch(fetchLists());
}, [])

  return (
    <div className="App">

          {/* {isLoading && <div>Loading...</div>}
          {error && <div>{error}</div>}


          {lists.map(list => 
              <div key={list.id}>{list.name}</div>
            )} */}


            

            <ListContainer />

    </div>
  );
}

export default App;
