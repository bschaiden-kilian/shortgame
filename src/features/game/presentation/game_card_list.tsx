import { useContext, useEffect, useState } from 'react'
import { Subheading2 } from '../../../common/components/Text'
import type Game from '../data/game_model'
import GameCard from './game_card';
import { Link } from 'react-router-dom';
import { ServiceContext } from '../../../common/context/ServiceContext';

const GameCardList = () => {
    const service = useContext(ServiceContext);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        if (!service) return;
        const poll = () => {
            const g = service.gameService.getGames();
            if (g.length === 0) { setTimeout(poll, 100); return; }
            setGames(g);
        };
        poll();
    }, [service]);

    return (
        <div className='h-full overflow-y-scroll'>
            <nav className='flex justify-between'>
                <Subheading2>Drills</Subheading2>
                <Subheading2>Filter</Subheading2>
            </nav>
            <div className='h-full flex flex-col gap-2 py-4'>
                {
                    games.map((e) =>
                        <Link key={e.id} to={e.id+"/player-selection"}>
                            <GameCard game={e}></GameCard>
                        </Link>

                    )
                }
            </div>
        </div>
    )
}

export default GameCardList 