export default class User {
    public id: string;
    public name: string

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
    }
}