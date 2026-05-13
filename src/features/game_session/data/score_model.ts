export default class Score {
    public id: string;
    public playerId: string;
    public gameSessionId: string;
    public roundNumber: number;
    public score: number;

    constructor(playerId: string, gameSessionId: string, roundNumber: number, score: number) {
        this.id = crypto.randomUUID();
        this.playerId = playerId;
        this.gameSessionId = gameSessionId;
        this.roundNumber = roundNumber;
        this.score = score;
    }
}