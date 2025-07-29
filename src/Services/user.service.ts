import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { IUser, IUserCredentials } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<IUser | null>;

  private readonly USER_KEY = 'currentUser';

  constructor(private http: HttpClient) {
    // Initialize with user from localStorage if exists
    const savedUser = localStorage.getItem(this.USER_KEY);
    this.user = new BehaviorSubject<IUser | null>(
      savedUser ? JSON.parse(savedUser) : null
    );
  }

  // Added this method to get current user synchronously
  getCurrentUser(): IUser | null {
    return this.user.value;
  }

  getUser(): Observable<IUser | null> {
    return this.user.asObservable();
  }

  // Updated signIn method to save to localStorage
  signIn(credentials: IUserCredentials): Observable<IUser> {
    return this.http.post<IUser>('/api/sign-in', credentials).pipe(
      map((user: IUser) => {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.user.next(user);
        return user;
      })
    );
  }

  // Updated signOut to clear localStorage
  signOut() {
    localStorage.removeItem(this.USER_KEY);
    this.user.next(null);
  }

  // Register method to create a new user
  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('/api/register', user);
  }
}
