import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../common/components/Button';
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
            
            navigate(`/${game.id}/play/${newSession.id}`);
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
            <UserSelectionList onSelect={(users) => setPlayerIds(users)}></UserSelectionList>
            <div className='h-12 w-full shrink'>
                <Button onClick={() => handleStart()} disabled={playerIds.length <= 0}>Start Game</Button>
            </div>
        </div>
    )
}

export default PlayerSelection; 