import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../common/components/Button';
import { Subheading1, Heading2, Body2 } from '../common/components/Text';
import { ServiceContext } from '../common/context/ServiceContext';
import UserSelectionList from '../features/user/presentation/user_selection_list';

const PlayerSelection = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const service = useContext(ServiceContext);

    const handleStart = () => {
        if (!service || !gameId) return;

        const playerIds = ["user1", "user2"];  // hardcoded for now
        service.gameSessionService.createGameSession(gameId, playerIds);

        const sessions = service.gameSessionService.getGameSessions();
        const newSession = sessions[sessions.length - 1];

        navigate(`/play/${newSession.id}`);
    };



    return (
        <div className='h-full flex flex-col gap-10'>
            <div className="w-full shrink flex flex-col gap-1.5">
                <Subheading1>Game</Subheading1>
                <Heading2>Tee Lagputting</Heading2>
                <Body2>
                    Hit 3 balls each round, trying to land between the front of the hole and 10% past it (1ft for a 10ft putt).
                    1 point in the zone. 2 points holed. Most points after 10 rounds wins.
                </Body2>
            </div>
            <UserSelectionList></UserSelectionList>
            <div className='h-12 w-full shrink'>
                <Button onClick={() => handleStart()}>Start Game</Button>
            </div>
        </div>
    )
}

export default PlayerSelection; 