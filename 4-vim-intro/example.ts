interface User {
    name: string;
    id: number;
}

class UserAccount {
    name: string;
    id: number;
    age: number;
    email: string;

    constructor(name: string, id: number, age: number, email: string) {
        this.name = name;
        this.id = id;
        this.age = age;
        this.email = email;
    }
}

const user: User = new UserAccount("Murphy", 1, 30, "m@gmail.com");
