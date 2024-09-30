import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  ToastController
} from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    FormsModule
  ],
})
export class HomePage {
  user = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router,private toastController: ToastController) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']); // Redirect to login if not authenticated
    }
  }
  async showLoginToast() {
    const toast = await this.toastController.create({
      message: 'Login successful!',
      duration: 2000,  // Toast will disappear after 2 seconds
      position: 'top',
      color: 'success',
    });
    toast.present();
  }
  async showFailToast() {
    const toast = await this.toastController.create({
      message: 'Wrong Email or Password, Try again',
      duration: 3000,  // Toast will disappear after 2 seconds
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }  

  goTosignup() {
    this.router.navigate(['/signup']);
  }
  onLogin() {
    console.log(this.user);
    this.authService.login(this.user).subscribe(
      response => {
        console.log('Login successful', response);
        this.router.navigate(['/main']).then(() => {
          // Call the showLoginToast function after navigation
          this.showLoginToast();
        }); // Navigate to main page on successful login
      },
      error => {
        console.error('Login failed', error);
        this.showFailToast();
      }
    );
  }
  register() {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        // Optionally navigate to a different page or reset the form
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
