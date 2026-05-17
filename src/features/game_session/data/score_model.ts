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

    toJSON(): object {
        return {
            id: this.id,
            playerId: this.playerId,
            gameSessionId: this.gameSessionId,
            roundNumber: this.roundNumber,
            score: this.score,
        };
    }

    static fromJSON(json: Record<string, unknown>): Score {
        const score = new Score(
            json.playerId as string,
            json.gameSessionId as string,
            json.roundNumber as number,
            json.score as number,
        );
        score.id = json.id as string;
        return score;
    }
}