export default class GameSession {
    public id: string;
    public gameId: string
    public playerIds: string[]

    constructor(gameId: string, playerIds: string[]) {
        this.id = crypto.randomUUID();
        this.gameId = gameId;
        this.playerIds = playerIds;
    }
}