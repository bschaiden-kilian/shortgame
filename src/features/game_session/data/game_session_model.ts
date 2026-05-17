export default class GameSession {
    public id: string;
    public gameId: string
    public playerIds: string[]
    public createdAt: Date;

    constructor(gameId: string, playerIds: string[]) {
        this.id = crypto.randomUUID();
        this.gameId = gameId;
        this.createdAt = new Date();
        this.playerIds = playerIds;
    }

    toJSON(): object {
        return {
            id: this.id,
            gameId: this.gameId,
            playerIds: this.playerIds,
            createdAt: this.createdAt.toISOString(),
        };
    }

    static fromJSON(json: Record<string, unknown>): GameSession {
        const session = new GameSession(json.gameId as string, json.playerIds as string[]);
        session.id = json.id as string;
        session.createdAt = new Date(json.createdAt as string);
        return session;
    }
}