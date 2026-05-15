import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceContext } from '../common/context/ServiceContext';
import Card from '../common/components/Card';
import { Button } from '../common/components/Button';
import { Heading1, Heading2, Heading3, Subheading1, Subheading2 } from '../common/components/Text';
import ScoreCard from '../features/game_session/presentation/score_card';
import GameSession from '../features/game_session/data/game_session_model';
import type User from '../features/user/data/user_model';
import type UserCardSelected from '../features/user/presentation/user_card_selected';

const Leaderboard = () => {
    const { sessionId } = useParams();
    const service = useContext(ServiceContext);
    const navigate = useNavigate();

    const [session, setSession] = useState<GameSession | undefined>(undefined);
    const [players, setPlayers] = useState<User[]>([]);
    const [scores, setScores] = useState<{ user: User; total: number }[]>([]);

    useEffect(() => {
        if (!service || !sessionId) return;

        let cancelled = false;

        const poll = () => {
            if (cancelled) return;
            const fetchedSession = service.gameSessionService.getGameSessionById(sessionId);
            const fetchedPlayers = service.userService.getUsers();

            if (!fetchedSession || fetchedPlayers.length === 0) {
                setTimeout(poll, 100);
                return;
            }

            const sessionPlayers = fetchedSession.playerIds
                .map(id => fetchedPlayers.find(p => p.id === id))
                .filter((p): p is User => p !== undefined);

            const scores = service.gameSessionService.getRoundsFromGameSessionId(fetchedSession.id);

            if (fetchedSession) {
                const totals = sessionPlayers.map(p => ({
                    user: p,
                    total: scores.filter(s => s.playerId === p.id).reduce((acc, s) => acc + s.score, 0),
                })).sort((a, b) => (service.gameService.getGameById(fetchedSession.gameId)?.lowestWins) ? a.total - b.total : b.total - a.total);

                setSession(fetchedSession);
                setPlayers(sessionPlayers);
                setScores(totals);
            }
        };

        poll();
        return () => { cancelled = true; };
    }, [service, sessionId]);

    if (!session) return null;

    return (
        <div className="h-full flex flex-col gap-5">
            <div className='flex flex-col gap-1 justify-center items-center'>
                {scores.map((u, i) => (
                    <Card key={u.user.id}>
                        {i == 0 ? <Subheading1>Winner</Subheading1> : ''}
                        <div className='flex justify-between items-center'>
                            <Heading3>{u.user.name ?? '—'}</Heading3>
                            <Subheading2>{u.total} {service?.gameService.getGameById(session.gameId)?.scoreUnit || 'points'}</Subheading2>
                        </div>
                    </Card>
                ))}
            </div>

            <ScoreCard gameSessionId={session} />

            <div className="w-full h-12 flex gap-1">
                <Button onClick={() => navigate('/')}>Done</Button>
            </div>
        </div>
    );
};

export default Leaderboard;
