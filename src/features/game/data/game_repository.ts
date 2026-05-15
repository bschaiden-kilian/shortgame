import  Game  from "./game_model";

export interface IGameRepository {
    getGameById(id: string): Promise<Game>
    getGames(): Promise<Game[]>
}

export class MockGameRepository implements IGameRepository {

    private mockGames: Game[] = [
        new Game(
            "Tee Lagputting",
            "10 rounds × 3 balls. Land a ball between front of hole to 10% past (1 ft for a 10 ft putt) for 1 pt, hole it for 2. Highest Score Wins",
            ["Distance Control", "Putting"],
            10,0,6, false, "points"),
        new Game(
            "U&D Drawback",
            "9 holes. Drop a ball off the green and chip at the pin. Once on, pull back one putter length and putt until holed. Lowest Score Wins",
            ["Distance Control", "Chipping", "Putting"],
            9,1,6, true, "strokes")
    ];
    
    async getGameById(id: string): Promise<Game> {
        const found = this.mockGames.find(game => game.id === id);
        return found ? Promise.resolve(found) : Promise.reject(new Error("Game not found"));
    }

    async getGames(): Promise<Game[]> {
        return Promise.resolve(this.mockGames);
    }
}