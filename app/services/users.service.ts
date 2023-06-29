import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //i use local storage because : allows you to store data on the client-side,
  //which means the data will persist even if the user refreshes the page or closes and reopens the browser
  private users: User[] = [];
  private loggedInUser: User | null = null;

  constructor() {
    // load users from Local Storage if available
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    // load logged-in user from Local Storage if available
    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    if (storedLoggedInUser) {
      this.loggedInUser = JSON.parse(storedLoggedInUser);
    }
  }

  addUser(user: User): boolean {
    const emailExists = this.isUserExists(user.email);
    if (emailExists) {
      return false; // user with the same email already exists
    }

    this.users.push(user);
    this.saveUsersToLocalStorage();
    return true; // user added successfully
  }

  isUserExists(email: string): boolean {
    return this.users.some((user) => user.email === email);
  }

  findUserByEmailAndPassword(
    email: string,
    password: string
  ): User | undefined {
    return this.users.find(
      (user) => user.email === email && user.password === password
    );
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
  }

  private saveUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  clearLoggedInUser() {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
  }
}
