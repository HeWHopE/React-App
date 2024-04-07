import React from 'react'

interface CloseXButtonProps {
  onClick: () => void
}

const CloseXButton: React.FC<CloseXButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-0 right-0 px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    >
      X
    </button>
  )
}

export default CloseXButton
