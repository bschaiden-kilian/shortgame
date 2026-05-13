import { useContext, useEffect, useState } from 'react';
import Card from '../common/components/Card';
import { Heading1, Heading3, Subheading1, Subheading2 } from '../common/components/Text';
import ScoreLogger from '../features/game_session/presentation/score_logger';
import { ServiceContext } from '../common/context/ServiceContext';
import { useParams } from 'react-router-dom';
import GameSession from '../features/game_session/data/game_session_model';

const Play = () => {
    const { sessionId } = useParams()
    const service = useContext(ServiceContext);
    const [currentRound, setCurrentRound] = useState(1);
    const [session, setSession] = useState<GameSession>(new GameSession("demo", [""]));
    const [currentPlayer, setCurrentPlayer] = useState(0)

    useEffect(() => {
        console.log("Effect ran. service:", !!service, "sessionId:", sessionId);

        if (service && sessionId) {
            const fetchedSession = service.gameSessionService.getGameSessionById(sessionId);
            console.log("Fetched session:", fetchedSession);

            if (fetchedSession) {
                console.log("Setting current player to:", fetchedSession.playerIds[0]);
                setSession(fetchedSession);
            }
        }
    }, [sessionId, service])

    const handleScore = (score: number) => {
        service?.gameSessionService.logScore(session.id, session.playerIds[currentPlayer], currentRound, score)
        handleNextPlayer();
    }

    const handleNextPlayer = () => {
        const game = service?.gameService.getGameById(session.gameId);

        if (currentPlayer < session.playerIds.length - 1) {
            setCurrentPlayer(currentPlayer + 1);
            return;
        }

        if (!game || currentRound >= game.rounds) {
            console.log("Game complete!");
            return;
        }

        setCurrentRound(currentRound + 1);
        setCurrentPlayer(0);
    }

    const currentPlayerScore = (): number => {
        let scores = service?.gameSessionService.getRoundsFromGameSessionId(session.id);

        let score = 0;
        scores?.filter((s) => s.playerId === session.playerIds[currentPlayer]).map((s) => { score += s.score });

        console.log("All scores:", scores);
        console.log("Filtering for playerId:", session.playerIds[currentPlayer]);


        return score;
    }

    console.log("Render. currentPlayer:", currentPlayer, "session.id:", session.id);
    console.log("User lookup for", currentPlayer, ":", service?.userService.getUserById(session.playerIds[currentPlayer]));
    return (
        <div className='h-full flex flex-col gap-5'>
            <div className='w-full h-fit flex gap-1 items-end justify-between'>
                <div className='w-full h-fit flex gap-1 items-end'>
                    <div className='flex flex-col gap-1.5'>
                        <Subheading2>Round</Subheading2>
                        <Heading1>{currentRound}</Heading1>
                    </div>
                    <Subheading1>{"/" + service?.gameService.getGameById(session.gameId)?.rounds}</Subheading1>
                </div>
                <div className='flex gap-1'>
                    {Array.from({ length: service?.gameService.getGameById(session.gameId)?.rounds ?? 0 }, (_, i) => (
                        <span
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < currentRound ? 'bg-emerald-500' : 'bg-gray-700'
                                }`}
                        />
                    ))}
                </div>
            </div>
            <div className="w-full shrink flex flex-col gap-1.5">
                <Card>
                    <div className='w-full h-full flex justify-between items-center'>
                        <div className='flex justify-center items-center gap-2'>
                            <span className='w-8 h-8 bg-emerald-500 text-mist-950 rounded-full font-mono font-bold flex justify-center items-center'>1</span>
                            <div>
                                <Subheading2>Now Playing</Subheading2>
                                <Heading3>{service?.userService.getUserById(session.playerIds[currentPlayer])?.name || "default"}</Heading3>
                            </div>
                        </div>
                        <div>
                            <Subheading2>Total</Subheading2>
                            <Heading3>{currentPlayerScore()}</Heading3>
                        </div>
                    </div>
                </Card>
            </div>
            <ScoreLogger minScore={1} maxScore={6} addScore={(score) => handleScore(score)}></ScoreLogger>
        </div>
    )
}

export default Play; 