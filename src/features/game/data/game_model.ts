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
}