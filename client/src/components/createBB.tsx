import React from 'react'
import { usePostBoardMutation } from '../services/BoardService' // Add this line to import the useCreateBoardMutation hook
const CreateBB: React.FC = () => {
  const [name, setName] = React.useState('') // Add this line to create a new state variable [name, setName
  const [createBoard] = usePostBoardMutation() // Add this line to import the useCreateBoardMutation hook

  const handleCreate = () => {
    const name = prompt('Enter the name of the board') // Add this line to prompt the user for the board name

    if (!name) {
      return
    }

    createBoard({ name: name })
  }

  return (
    <button onClick={() => handleCreate()}>
      <div className="w-60 h-20 duration-200 hover:bg-slate-200 cursor-pointer bg-slate-50">
        <div className="flex items-center justify-center h-full">
          Create Board
        </div>
      </div>
    </button>
  )
}

export default CreateBB
