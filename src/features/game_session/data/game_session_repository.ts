import GameSession from "./game_session_model";


export interface IGameSessionRepository {
    getGameSessionById(id: string): Promise<GameSession>
    getGameSessions(): Promise<GameSession[]>
    updateGameSession(gameSession: GameSession): Promise<void>
}

export class MockGameSessionRepository implements IGameSessionRepository {
    private mockGameSessions: GameSession[] = [];

    constructor() {
        let seed = new GameSession("game1", ["user1", "user2"]);
        seed.id = "gameSession1";
        this.mockGameSessions.push(seed);
    }

    getGameSessionById(id: string): Promise<GameSession> {
        const found = this.mockGameSessions.find(gameSession => gameSession.id === id);
        return found ? Promise.resolve(found) : Promise.reject(new Error("Game session not found"));
    }
    getGameSessions(): Promise<GameSession[]> {
        return Promise.resolve(this.mockGameSessions);
    }
    updateGameSession(gameSession: GameSession): Promise<void> {
        const index = this.mockGameSessions.findIndex(gs => gs.id === gameSession.id);
        if (index !== -1) {
            this.mockGameSessions[index] = gameSession;
            return Promise.resolve();
        } else {
            return Promise.reject(new Error("Game session not found"));
        }
    }

}