import CircleItem from './CircleItem'
import ListItem from './ListItem'
import TaskList from './taskList'
import { IList } from '../models/IList'
import {
  useFetchListsQuery,
  useDeleteListMutation,
  useUpdateListMutation,
} from '../services/ListService'

const ListContainer = () => {
  const {
    data: lists,
    error: listError,
    isLoading: listIsLoading,
  } = useFetchListsQuery()
  const [deleteList, {}] = useDeleteListMutation()
  const [updateList, {}] = useUpdateListMutation()

  const handleRemove = (list: IList) => {
    deleteList(list)
  }

  const handleUpdate = (list: IList) => {
    updateList(list)
  }

  if (listIsLoading) {
    return <div>Loading...</div>
  }

  if (listError) {
    return <div>Error</div>
  }

  return (
    <div>
      <div className="vertical-container">
        <div
          className="list-container"
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          {lists &&
            lists.map((list: IList) => (
              <div key={list.id} style={{ margin: '20px' }}>
                <ListItem
                  remove={handleRemove}
                  update={handleUpdate}
                  list={list}
                />
                <CircleItem listId={Number(list.id)} />
                <TaskList listId={Number(list.id)} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ListContainer
