export default class Game {
    public id: string;
    public name: string
    public rounds: number;
    public scoreMin: number;
    public scoreMax: number;
    public description: string;
    public lowestWins : boolean;
    public scoreUnit : string;
    public tags: string[]

    constructor(name: string, description: string, tags: string[], rounds: number, scoreMin: number, scoreMax: number, lowestWins: boolean, scoreUnit: string) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.rounds = rounds;
        this.scoreMin = scoreMin;
        this.scoreMax = scoreMax;
        this.description = description;
        this.tags = tags;
        this.lowestWins = lowestWins;
        this.scoreUnit = scoreUnit;
    }

    toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            rounds: this.rounds,
            scoreMin: this.scoreMin,
            scoreMax: this.scoreMax,
            description: this.description,
            lowestWins: this.lowestWins,
            scoreUnit: this.scoreUnit,
            tags: this.tags,
        };
    }

    static fromJSON(json: Record<string, unknown>): Game {
        const game = new Game(
            json.name as string,
            json.description as string,
            json.tags as string[],
            json.rounds as number,
            json.scoreMin as number,
            json.scoreMax as number,
            json.lowestWins as boolean,
            json.scoreUnit as string,
        );
        game.id = json.id as string;
        return game;
    }
}