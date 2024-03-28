import React from 'react';
import { IList } from '../models/IList';

interface ListItemProps {
  list: IList;
  remove: (list: IList) => void;
  update: (list: IList) => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, remove, update }) => {
  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (list.id !== undefined) {
      remove(list);
    } else {
      console.error('ID is undefined');
    }
  };
  
  const handleUpdate = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const name = prompt() || '';

    if (list.id !== undefined) {
      update({...list, name: name});
    } else {
      console.error('ID is undefined');
    }
  };
  return (
    <div style={{ display: 'inline-block', marginRight: '10px', border: '1px solid #ccc', padding: '5px' }} onClick={(event) => handleUpdate(event)}>
      {list.id} {list.name}
      <button onClick={(event) => handleRemove(event)}>Remove</button>
    </div>
  );
}


export default ListItem;
