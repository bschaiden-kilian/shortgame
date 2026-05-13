import type User from "../data/user_model";
import { type IUserRepository, MockUserRepository } from "../data/user_repository";

export class UserService {
    private userRepository: IUserRepository;
    private users : User[] = [];
    
    constructor() {
        this.userRepository = new MockUserRepository();
        this.userRepository.getUsers().then(users => this.users = users, error => console.error("Failed to fetch users:", error));
    }

    getUserById(id: string): User | undefined {
        return this.users.find(user => user.id === id) ;
    }
    
    getUsers(): User[] {
        return this.users;
    }

    addUser(user: User): void {
        this.userRepository.addUser(user).then(addedUser => {
            this.users.push(addedUser);
        }, error => console.error("Failed to add user:", error));
    }

}