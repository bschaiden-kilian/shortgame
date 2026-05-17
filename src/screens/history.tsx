import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heading2 } from "../common/components/Text"
import { ServiceContext } from "../common/context/ServiceContext";
import type GameSession from "../features/game_session/data/game_session_model";
import GameSessionCard from "../features/game_session/presentation/game_session_card";

const History = () => {
    const service = useContext(ServiceContext);

    const [sessions, setSession] = useState<GameSession[] | undefined>(undefined);

    useEffect(() => {
        if (!service) return;

        let cancelled = false;

        const poll = () => {
            if (cancelled) return;
            const fetchedSessions = service.gameSessionService.getGameSessions();

            if (!fetchedSessions) {
                setTimeout(poll, 100);
                return;
            }

            setSession(fetchedSessions);
        };

        poll();
        return () => { cancelled = true; };
    }, [service]);

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <Heading2>History</Heading2>
            <div className="flex flex-col gap-1.5">
                {sessions?.map((s) => {
                    return <Link key={s.id} to={s.id}>
                        <GameSessionCard session={s}></GameSessionCard>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default History