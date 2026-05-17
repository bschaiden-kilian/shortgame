export default class User {
    public id: string;
    public name: string

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
    }

    toJSON(): object {
        return {
            id: this.id,
            name: this.name,
        };
    }

    static fromJSON(json: Record<string, unknown>): User {
        const user = new User(json.name as string);
        user.id = json.id as string;
        return user;
    }
}