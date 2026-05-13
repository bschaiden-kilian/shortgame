import Score from "./score_model"

export interface IScoreRepository {
    getScoreById(id: string): Promise<Score>
    getScoresByGameSessionId(gameSessionId: string): Promise<Score[]> 
    getScores(): Promise<Score[]>
    createScore(score: Score): Promise<void>
    updateScore(id: string, score: number): Promise<void>
    deleteScore(id: string): Promise<void>
}

export class MockScoreRepository implements IScoreRepository {
    private mockScores: Score[] = [];

    async getScoreById(id: string): Promise<Score> {
        const found = this.mockScores.find(score => score.id === id);
        return found ? Promise.resolve(found) : Promise.reject(new Error("Score not found"));
    }

    async getScores(): Promise<Score[]> {
        return Promise.resolve(this.mockScores);
    }

    async getScoresByGameSessionId(gameSessionId: string): Promise<Score[]> {
        const scores = this.mockScores.filter(score => score.gameSessionId === gameSessionId);
        return Promise.resolve(scores);
    }

    async createScore(score: Score): Promise<void> {
        this.mockScores.push(score);
        return Promise.resolve();
    }
    
    async updateScore(id: string, score: number): Promise<void> {
        const index = this.mockScores.findIndex(s => s.id === id);
        if (index !== -1) {
            this.mockScores[index].score = score;
            return Promise.resolve();
        } else {
            return Promise.reject(new Error("Score not found"));
        }
    }

    async deleteScore(id: string): Promise<void> {
        const index = this.mockScores.findIndex(score => score.id === id);
        if (index !== -1) {
            this.mockScores.splice(index, 1);
            return Promise.resolve();
        } else {
            return Promise.reject(new Error("Score not found"));
        }
    }
}