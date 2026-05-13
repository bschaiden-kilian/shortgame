import GameSession from "../data/game_session_model";
import { MockGameSessionRepository, type IGameSessionRepository } from "../data/game_session_repository";
import Score from "../data/score_model";
import { MockScoreRepository, type IScoreRepository } from "../data/score_repository";


export class GameSessionService {
    private sessionRepository: IGameSessionRepository = new MockGameSessionRepository();
    private scoreRepository: IScoreRepository = new MockScoreRepository();
    private gameSessions: GameSession[] = []
    private scores: Score[] = []

    constructor() {
        this.sessionRepository.getGameSessions().then(gameSessions => this.gameSessions = [...gameSessions], error => console.error("Failed to fetch game sessions:", error));
        this.scoreRepository.getScores().then(scores => this.scores = [...scores], error => console.error("Failed to fetch scores:", error));
    }

    createGameSession(gameId: string, playerIds: string[]): void {
        const newSession = new GameSession(gameId, playerIds);
        this.gameSessions.push(newSession);
        this.sessionRepository.updateGameSession(newSession).catch(error => console.error("Failed to create game session:", error));
    }

    getGameSessionById(id: string): GameSession {
        const found = this.gameSessions.find(gameSession => gameSession.id === id);
        return found ? found : (() => { throw new Error("Game session not found") })();
    }

    getGameSessions(): GameSession[] {
        return this.gameSessions;
    }

    getRoundsFromGameSessionId(gameSessionId: string): Score[] {
        return this.scores.filter(score => score.gameSessionId === gameSessionId);
    }


    logScore(gameSessionId: string, playerId: string, roundNumber: number, score: number): void {
        const gameSession = this.getGameSessionById(gameSessionId);
        if (!gameSession) {
            console.error("Game session not found for logging score:", gameSessionId);
            return;
        }

        let tmp = new Score(playerId, gameSessionId, roundNumber, score);
        this.scores.push(tmp);
        this.scoreRepository.createScore(tmp).catch(error => console.error("Failed to log score:", error));
        console.log("After both pushes, scores length:", this.scores.length);
        console.log("Same array reference?", this.scores === (this.scoreRepository as any).mockScores);
    }

    updateGameSession(gameSession: GameSession): void {
        const index = this.gameSessions.findIndex(gs => gs.id === gameSession.id);
        if (index !== -1) {
            this.gameSessions[index] = gameSession;
            this.sessionRepository.updateGameSession(gameSession).catch(error => console.error("Failed to update game session:", error));
        } else {
            console.error("Game session not found for update:", gameSession.id);
        }
    }
}
