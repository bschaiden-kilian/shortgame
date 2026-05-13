import type Game from "../data/game_model";
import { MockGameRepository, type IGameRepository } from "../data/game_repository";

export class GameService {
    private repository: IGameRepository;
    private games : Game[] = [];

    constructor() {
        this.repository = new MockGameRepository();
        this.repository.getGames().then(games => this.games = games, error => console.error("Failed to fetch games:", error));
    }

    getGameById(id: string): Game | undefined{
        return this.games.find(game => game.id === id) ;
    }

    getGames(): Game[] {
        return this.games;
    }
}