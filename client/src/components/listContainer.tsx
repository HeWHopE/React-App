import React from 'react';
import { listApi } from '../services/ListService';
import ListItem from './ListItem';
import { IList } from '../models/IList';

const ListContainer = () => {
    const { data: lists, error, isLoading } = listApi.useFetchListsQuery();
    const [createList] = listApi.usePostListMutation();

    const [deleteList, {}]  = listApi.useDeleteListMutation();
    const [updateList, {}] = listApi.useUpdateListMutation ();


    const handleCreate = async () => {
        const name = prompt('Enter list name');
        if (name !== null) {
            await createList({ name });
        }
    };

    const handleRemove = (list: IList) => {
        deleteList(list); // Pass the ID of the list to delete
    };
    
    const handleUpdate = (list: IList) => {
        updateList(list); // Pass the ID of the list to update
    };
    


    return (
        <div>
            <button onClick={handleCreate}>Create List</button>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error</div>}
            {lists &&  lists.map((list: IList) =>          
                <ListItem remove ={handleRemove} update={handleUpdate} key={list.id} list={list} />)}
        </div>
    );
};

export default ListContainer;
