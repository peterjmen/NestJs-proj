import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'johnd@june.biz', role: 'ADMIN' },
    { id: 2, name: 'Jane Smith', email: 'janes@june.biz', role: 'INTERN' },
    { id: 3, name: 'Mike Johnson', email: 'mikej@june.biz', role: 'ENGINEER' },
    { id: 4, name: 'Sarah Williams', email: 'sarahw@june.biz', role: 'INTERN' },
    { id: 5, name: 'David Brown', email: 'davidb@june.biz', role: 'INTERN' },
  ];

  //   Methods - named after routes in controller
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  //   findOne(id: string)
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  //   create(user: {})
  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
