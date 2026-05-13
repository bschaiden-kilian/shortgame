import { useEffect, useState } from 'react'
import { Subheading2 } from '../../../common/components/Text'
import { GameService } from '../service/game_service'
import type Game from '../data/game_model'
import GameCard from './game_card';

const service = new GameService();

const GameCardList = () => {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const g = await service.getGames();
            setGames(g);

            if (g.length === 0)
                setTimeout(() => {
                    fetch();
                }, 1000);
        };

        fetch();
    }, []);
    
    return (
        <div className='h-full overflow-y-scroll'>
            <nav className='flex justify-between'>
                <Subheading2>Drills</Subheading2>
                <Subheading2>Filter</Subheading2>
            </nav>
            <div className='h-full flex flex-col gap-2 py-4'>
            {
                games.map((e) =>  <GameCard game={e}></GameCard>)
            }
            </div>
        </div>
    )
}

export default GameCardList 