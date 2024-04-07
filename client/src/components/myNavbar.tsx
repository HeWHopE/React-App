import React from 'react'

const myNavbar: React.FC = () => {
  return (
    <nav className="bg-white border-b-2 border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-6 ">
        <div className="flex items-center justify-between h-8">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                MyTaskBoards
              </div>
            </div>
          </div>
          <div className="ml-10 flex items-baseline space-x-4">123</div>
        </div>
      </div>
    </nav>
  )
}

export default myNavbar
