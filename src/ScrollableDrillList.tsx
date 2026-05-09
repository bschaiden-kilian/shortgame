import React from 'react'
import gamesData from './data/games.json'
import DrillCard from './DrillCard'

const ScrollableDrillList = () => {
    return (
        <div className='min-h-full overflow-y-scroll'>
            <div className='flex justify-between'>
                <h3 className=" text-gray-400 font-mono text-[10px] font-light tracking-wider uppercase">DRILLS</h3>
                <h3 className=" text-gray-400 font-mono text-[10px] font-light tracking-wider uppercase"> V Filter V </h3>
            </div>
            <div className='flex h-[58vh] flex-col overflow-y-scroll gap-4 py-4'>
            {
                gamesData.map((d,i) => {
                    return <DrillCard key={i} drill={d}></DrillCard>
                })
            }
            </div>
        </div>
    )
}

export default ScrollableDrillList;