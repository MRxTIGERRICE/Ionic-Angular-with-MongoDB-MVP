import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import {ToastController} from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient, private toastcontroller: ToastController) {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string; name: string }>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        const token = response.token;
        localStorage.setItem('token', token);
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.id;
        const userName = response.name;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
      })
    );
  }
  async showDepositSuccessToast() {
    const toast = await this.toastcontroller.create({
      message: 'Deposition submitted successfully!',
      duration: 2000,  // 2 seconds
      position: 'top',
      color:'success',
    });
    toast.present();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    console.log('logged out!');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, user).pipe(
      tap(response => {
        console.log(response.message);
      })
    );
  }

  deposit(depositionData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/depositions`, depositionData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(response => {
        console.log('Deposition response:', response);
      })
    );
  }

  getUserDepositions(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/depositions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(response => {
        console.log('User depositions:', response);
      })
    );
  }

  getCurrentUser(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(response => {
        console.log('User profile:', response);
      })
    );
  }
}
