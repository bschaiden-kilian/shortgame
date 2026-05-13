import { createContext } from "react";
import type { GameService } from "../../features/game/service/game_service";
import type { GameSessionService } from "../../features/game_session/service/game_session_service";
import type { UserService } from "../../features/user/service/user_service";

export interface IServiceContext {
    gameService: GameService;
    gameSessionService: GameSessionService;
    userService: UserService;
}

export const ServiceContext = createContext<IServiceContext | undefined>(undefined);