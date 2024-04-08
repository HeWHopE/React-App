import React, { useState, useEffect } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'

interface HistoryModalProps {
  onClose: () => void
  activities?: any[]
  onOpenChange: (isOpen: boolean) => void // Callback function to notify parent about open/close state
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  onClose,
  activities,
  onOpenChange,
}) => {
  const [open, setOpen] = useState(false)

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const amPm = hour >= 12 ? 'pm' : 'am'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const month = months[date.getMonth()]
    const day = date.getDate()
    return `${month} ${day}`
  }

  // Notify parent about the change in open/close state
  useEffect(() => {
    onOpenChange(open)
  }, [open, onOpenChange])
  console.log(activities);
  return (
    <div>
      <div
        id="history-modal"
        className={` min-h-[871px] border-l-2  bg-slate-600 top-12 ${open ? 'w-72' : 'w-4'} duration-300 absolute right-0 overflow-hidden`}
      >
        <nav
          className={`history-navbar justify-center w-full text-white px-4 duration-300 py-2 flex items-center`}
        >
          <h2
            className={`text-lg flex duration-300 ${open ? '' : 'invisible'} duration-300`}
          >
            History
          </h2>
        </nav>
        {open && ( // Conditionally render the list items only when the modal is open
          <div className={`mb-2 pl-2 pr-2`}>
            <ul className="p-2 border-t-2 border-slate-400">
  {activities &&
    activities
      .slice() // Create a shallow copy of the activities array
      .sort((a, b) => b.id - a.id) // Sort activities by ID in descending order
      .slice(0, 8) // Get the last 8 activities after sorting
      .map((activity, index) => (
        <div key={index} className="border-b-2 border-slate-400 text-white">
          <li className="p-2">{activity.action_description}</li>
          <div className="flex justify-between px-2 py-1 text-white">
            <span>
              {formatDate(activity.timestamp.toLocaleString())} at{' '}
              {formatTime(activity.timestamp.toLocaleString())}
            </span>
          </div>
        </div>
      ))}
</ul>


          </div>
        )}
      </div>

      <BsArrowLeftShort
        className={`bg-slate-600 text-white hover:bg-slate-400 z-1 top-14 duration-300 ${open ? 'right-64 rotate-180' : 'right-1'} text-dark-purple text-3xl rounded-full absolute cursor-pointer transition-all duration-300`}
        onClick={() => setOpen(!open)}
      />
    </div>
  )
}

export default HistoryModal
