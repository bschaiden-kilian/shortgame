import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/components/Card';
import { Button } from '../common/components/Button';
import { Heading1, Heading3, Subheading1, Subheading2 } from '../common/components/Text';
import ScoreLogger from '../features/game_session/presentation/score_logger';
import { ServiceContext } from '../common/context/ServiceContext';
import { useParams } from 'react-router-dom';
import GameSession from '../features/game_session/data/game_session_model';
import type User from '../features/user/data/user_model';
import ScoreCard from '../features/game_session/presentation/score_card';

const Play = () => {
    const { sessionId } = useParams()
    const service = useContext(ServiceContext);
    const navigate = useNavigate();
    const [currentRound, setCurrentRound] = useState(1);
    const [session, setSession] = useState<GameSession>(new GameSession("demo", [""]));
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [users, setUsers] = useState<User[]>([])
    const [gameComplete, setGameComplete] = useState(false)

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

    useEffect(() => {
        if (!service) return;
        const poll = () => {
            const u = service.userService.getUsers();
            if (u.length === 0) {
                setTimeout(poll, 200);
                return;
            }
            setUsers(u);
        };
        poll();
    }, [service])

    const handleScore = (score: number) => {
        service?.gameSessionService.logScore(session.id, session.playerIds[currentPlayer], currentRound, score)
        handleNextPlayer();
    }

    const handleUndo = () => {
        if (gameComplete) {
            service?.gameSessionService.removeScore(session.id, session.playerIds[currentPlayer], currentRound);
            setGameComplete(false);
            return;
        }

        if (currentPlayer > 0) {
            const prevPlayer = currentPlayer - 1;
            service?.gameSessionService.removeScore(session.id, session.playerIds[prevPlayer], currentRound);
            setCurrentPlayer(prevPlayer);
        } else if (currentRound > 1) {
            const prevRound = currentRound - 1;
            const prevPlayer = session.playerIds.length - 1;
            service?.gameSessionService.removeScore(session.id, session.playerIds[prevPlayer], prevRound);
            setCurrentRound(prevRound);
            setCurrentPlayer(prevPlayer);
        }
    }

    const handleNextPlayer = () => {
        const game = service?.gameService.getGameById(session.gameId);

        if (currentPlayer < session.playerIds.length - 1) {
            setCurrentPlayer(currentPlayer + 1);
            return;
        }

        if (!game || currentRound >= game.rounds) {
            setGameComplete(true);
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

    const currentUser = users.find(u => u.id === session.playerIds[currentPlayer]);
    console.log("Render. currentPlayer:", currentPlayer, "session.id:", session.id);
    console.log("User lookup for", currentPlayer, ":", currentUser);
    return (
        <div className='h-full flex flex-col gap-5 overflow-y-auto'>
            <div className='w-full h-fit flex gap-1 items-end justify-between'>
                <div className='w-full h-fit flex gap-1 items-end'>
                    <div className='flex flex-col'>
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
            {gameComplete ? (
                <div className="w-full shrink min-h-16 h-16">
                    <Button onClick={() => navigate(`/${session.gameId}/leaderboard/${session.id}`)}>Finish Game</Button>
                </div>
            ) : (
                <div className="w-full shrink flex flex-col gap-1.5">
                    <Card>
                        <div className='w-full h-full flex justify-between items-center'>
                            <div className='flex justify-center items-center gap-2'>
                                <div>
                                    <Subheading2>Now Playing</Subheading2>
                                    <Heading3>{currentUser?.name ?? "—"}</Heading3>
                                </div>
                            </div>
                            <div>
                                <Subheading2>Total</Subheading2>
                                <Heading3>{currentPlayerScore()}</Heading3>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            <ScoreLogger gameComplete={gameComplete} minScore={1} maxScore={6} addScore={(score) => handleScore(score)}></ScoreLogger>
            <div className="w-full grow h-16 min-h-16">
                <Button onClick={handleUndo} disabled={currentRound === 1 && currentPlayer === 0}>Undo</Button>
            </div>
            <ScoreCard gameSessionId={session} currentPlayerId={session.playerIds[currentPlayer]} />
        </div>
    )
}

export default Play; 