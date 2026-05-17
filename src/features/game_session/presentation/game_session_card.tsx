import { useContext, useEffect, useState } from 'react'
import type GameSession from '../data/game_session_model';
import { ServiceContext } from '../../../common/context/ServiceContext';
import type Game from '../../game/data/game_model';
import Card from '../../../common/components/Card';
import { Body1, Heading3, Subheading1 } from '../../../common/components/Text';
import type User from '../../user/data/user_model';

interface IGameSessionCardProps {
    session: GameSession
}

const GameSessionCard = (props: IGameSessionCardProps) => {
    const service = useContext(ServiceContext);
    const [game, setGame] = useState<Game | undefined>(undefined);
    const [players, setPlayers] = useState<User[] | undefined>(undefined);

    useEffect(() => {
        if (!service) return;

        let cancelled = false;

        const poll = () => {
            if (cancelled) return;
            const fetchedGame = service.gameService.getGameById(props.session.gameId);
            const fetchedUsers = service.userService.getUsers();

            if (!fetchedGame) {
                setTimeout(poll, 100);
                return;
            }

            setGame(fetchedGame);

            setPlayers(
                props.session.playerIds
                    .map(id => fetchedUsers.find(p => p.id === id))
                    .filter((p): p is User => p !== undefined)
            );
        };

        poll();
        return () => { cancelled = true; };
    }, [service, props.session]);

    return (
        <Card>
            <Heading3>{game?.name}</Heading3>
            <Subheading1>{players?.map((p) => p.name + " ")}</Subheading1>  
            <Body1>Played on {props.session.createdAt.toLocaleString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Body1>
        </Card>
    )
}

export default GameSessionCard; 