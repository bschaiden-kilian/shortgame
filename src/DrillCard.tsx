import React from 'react'

const DrillCard = ({drill: any}) => {
  return (
    <div className='w-full p-4 flex flex-col gap-2 bg-mist-900 rounded-lg border border-mist-800'>
        <h3 className=" text-gray-400 font-mono text-[10px] font-light tracking-wider">Distance Control</h3>
        <h2 className="text-2xl font-md tracking-tight">Tee-Drill Lagputting</h2>
        <p className="w-2/3 text-gray-400 text-sm font-light">Pick a drill. Log scores. Get out of your own head.</p>
        <h3 className=" text-emerald-500 self-end font-mono text-xs font-light tracking-tighter uppercase ">Tap to Start →</h3>
    </div>
  )
}

export default DrillCard