import  Game  from "./game_model";

export interface IGameRepository {
    getGameById(id: string): Promise<Game>
    getGames(): Promise<Game[]>
}

export class MockGameRepository implements IGameRepository {

    private mockGames: Game[] = [];
    
    constructor(){
        let seed = new Game("Lag Putting Tee", "Mock Description", ["Distance Control", "Putting"],10,1,6);
        seed.id = "game1";
        this.mockGames.push(seed);
    }


    async getGameById(id: string): Promise<Game> {
        const found = this.mockGames.find(game => game.id === id);
        return found ? Promise.resolve(found) : Promise.reject(new Error("Game not found"));
    }

    async getGames(): Promise<Game[]> {
        return Promise.resolve(this.mockGames);
    }
}