import React from 'react'

const MyNavbar: React.FC = () => {
  return (
    <nav className="bg-white h-12 border-b-2 border-gray-200">
      <div className="mx-auto px-4 sm:px-2 md:px-2 lg:px-6 ">
        <div className="flex items-center justify-between h-10">
          MyTaskBoards
        </div>
      </div>
    </nav>
  )
}

export default MyNavbar
