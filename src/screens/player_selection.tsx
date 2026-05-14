import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../common/components/Button';
import { Subheading1, Heading2, Body2 } from '../common/components/Text';
import { ServiceContext } from '../common/context/ServiceContext';
import UserSelectionList from '../features/user/presentation/user_selection_list';
import type Game from '../features/game/data/game_model';

const PlayerSelection = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const service = useContext(ServiceContext);
    const [game, setGame] = useState<Game | undefined>(undefined)
    const [playerIds, setPlayerIds] = useState<string[]>([]);

    const handleStart = () => {
        if(service && game){
            service.gameSessionService.createGameSession(game.id, playerIds);
            
            const sessions = service.gameSessionService.getGameSessions();
            const newSession = sessions[sessions.length - 1];
            
            navigate(`/play/${newSession.id}`);
        }
    };

    useEffect(() => {
        if(service && gameId) {
            let fetchedGame = service.gameService.getGameById(gameId);

            if(fetchedGame)
                setGame(fetchedGame);
        }
    }, [service, gameId])



    return (
        <div className='h-full flex flex-col gap-10'>
            <div className="w-full shrink flex flex-col gap-1.5">
                <Subheading1>Game</Subheading1>
                <Heading2>{game?.name}</Heading2>
                <Body2>
                    {game?.description}
                </Body2>
            </div>
            <UserSelectionList onSelect={(users) => setPlayerIds(users)}></UserSelectionList>
            <div className='h-12 w-full shrink'>
                <Button onClick={() => handleStart()}>Start Game</Button>
            </div>
        </div>
    )
}

export default PlayerSelection; 