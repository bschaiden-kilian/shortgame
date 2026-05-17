import { Outlet, useParams } from 'react-router-dom'
import {  Heading2, Body2 } from './Text'
import { useContext, useState, useEffect } from 'react';
import type Game from '../../features/game/data/game_model';
import { ServiceContext } from '../context/ServiceContext';

const GameLayout = () => {
    const { gameId } = useParams();
    const service = useContext(ServiceContext);
    const [game, setGame] = useState<Game | undefined>(undefined)

    useEffect(() => {
        if (service && gameId) {
            let fetchedGame = service.gameService.getGameById(gameId);

            if (fetchedGame)
                setGame(fetchedGame);
        }
    }, [service, gameId])
    return (
        <div className="w-full shrink flex flex-col gap-10">
            <div className='w-full flex flex-col gap-1.5'>
                <Heading2>{game?.name}</Heading2>
                <Body2>
                    {game?.description}
                </Body2>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default GameLayout;