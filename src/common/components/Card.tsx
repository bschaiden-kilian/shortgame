import React from 'react'

interface ICardProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const Card = (props : ICardProps) => {
  return (
    <div onClick={() => props.onClick != undefined ? props.onClick() : ''} className='w-full h-fit p-4 flex flex-col gap-2 bg-mist-900 rounded-lg border border-mist-800'>
        {props.children}
    </div>
  )
}

export default Card