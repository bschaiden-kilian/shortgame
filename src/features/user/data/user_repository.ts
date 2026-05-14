import User from "./user_model";

export interface IUserRepository {
    getUserById(id: string): Promise<User>
    addUser(user: User): Promise<User>
    getUsers(): Promise<User[]>
}

export class MockUserRepository implements IUserRepository {

    private mockUsers: User[] = [];
    private users = ["Kilian", "Marco","Jan","Ferdinand"];

    constructor() {
        this.users.forEach((name) => {
            let user = new User(name);
            this.mockUsers.push(user);
        });
    }

    getUserById(id: string): Promise<User> {
        const found = this.mockUsers.find(user => user.id === id);
        return found ? Promise.resolve(found) : Promise.reject(new Error("User not found"));
    }
    addUser(user: User): Promise<User> {
        this.mockUsers.push(user);
        return Promise.resolve(user);
    }
    getUsers(): Promise<User[]> {
        return Promise.resolve(this.mockUsers);
    }

}