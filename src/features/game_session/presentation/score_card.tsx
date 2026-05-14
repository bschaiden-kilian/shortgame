import { useContext, useEffect, useState } from 'react'
import { ServiceContext } from '../../../common/context/ServiceContext';
import type Game from '../../game/data/game_model';
import type GameSession from '../data/game_session_model';
import type User from '../../user/data/user_model';
import type Score from '../data/score_model';
import { Body1, Body2, Heading3, Subheading1, Subheading2 } from '../../../common/components/Text';

interface IScoreCardProps {
    gameSessionId: GameSession;
    currentPlayerId?: string;
}

const ScoreCard = ({ gameSessionId, currentPlayerId }: IScoreCardProps) => {
    const service = useContext(ServiceContext);
    const [game, setGame] = useState<Game | undefined>(undefined);
    const [players, setPlayers] = useState<User[]>([]);
    const [scores, setScores] = useState<Score[]>([]);

    useEffect(() => {
        if (!service) return;

        let cancelled = false;

        const poll = () => {
            if (cancelled) return;
            const fetchedGame = service.gameService.getGameById(gameSessionId.gameId);
            const fetchedPlayers = service.userService.getUsers();

            if (!fetchedGame || fetchedPlayers.length === 0) {
                setTimeout(poll, 100);
                return;
            }

            setGame(fetchedGame);
            setPlayers(
                gameSessionId.playerIds
                    .map(id => fetchedPlayers.find(p => p.id === id))
                    .filter((p): p is User => p !== undefined)
            );
        };

        poll();
        return () => { cancelled = true; };
    }, [service, gameSessionId]);

    useEffect(() => {
        if (!service) return;
        const refresh = () => setScores(service.gameSessionService.getRoundsFromGameSessionId(gameSessionId.id));
        refresh();
        const interval = setInterval(refresh, 300);
        return () => clearInterval(interval);
    }, [service, gameSessionId]);

    if (!game) return null;

    const rounds = Array.from({ length: game.rounds }, (_, i) => i + 1);

    const getScore = (playerId: string, round: number): number | null => {
        const s = scores.find(s => s.playerId === playerId && s.roundNumber === round);
        return s !== undefined ? s.score : null;
    };

    return (
        <div className="w-full bg-mist-900 border border-mist-800 rounded-xl overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-mist-800">
                        <th className="text-left px-4 py-2 text-gray-500 font-mono text-[10px] font-light tracking-widest uppercase w-1/3">Player</th>
                        {rounds.map(r => (
                            <th key={r} className="text-center px-1 py-2 text-gray-500 font-mono text-[10px] font-light tracking-widest uppercase">R{r}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, idx) => {
                        const isCurrent = player.id === currentPlayerId;
                        return (
                            <tr key={player.id} className={idx < players.length - 1 ? 'border-b border-mist-800' : ''}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Body2>
                                            {player.name}
                                        </Body2>
                                    </div>
                                </td>
                                {rounds.map(r => {
                                    const s = getScore(player.id, r);
                                    return (
                                        <td key={r} className="text-center px-1 py-3 font-mono text-xs">
                                            {s !== null
                                                ? <span className={isCurrent ? 'text-white' : 'text-gray-300'}>{s}</span>
                                                : <span className="text-gray-600">—</span>
                                            }
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ScoreCard;
