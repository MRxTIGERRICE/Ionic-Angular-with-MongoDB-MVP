import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import {
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
  IonLabel,
  IonItem,
  ToastController
} from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
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
    FormsModule,
    IonLabel,
    IonItem
  ]
})
export class SignupPage implements OnInit {
  user = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    city: '',
    state: '',
    pincode: ''
  };
  constructor(private authService: AuthService, private router: Router, private toastcontroller: ToastController) { }

  ngOnInit() {
  }
  async showRegistrationSuccessToast() {
    const toast = await this.toastcontroller.create({
      message: 'Registreation Successful',
      duration: 2000,  // 2 seconds
      position: 'top',
      color:'success',
    });
    toast.present();
  }
  async showRegistrationFailToast() {
    const toast = await this.toastcontroller.create({
      message: 'Failed to Register',
      duration: 3000,  // 2 seconds
      position: 'top',
      color:'danger',
    });
    toast.present();
  }
  onRegister() {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.router.navigate(['/']).then(() => {
          this.showRegistrationSuccessToast();
        });
      },
      error => {
        console.error('Registration failed', error);
        this.showRegistrationFailToast();
      }
    );
    console.log(this.user)
  }
}
