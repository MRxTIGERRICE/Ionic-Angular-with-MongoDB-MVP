import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegmentButton,
  IonIcon,
  IonButton,
  IonButtons,
  IonTab,
  IonTabButton,
  IonTabBar,
  IonTabs,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  ToastController
} from '@ionic/angular/standalone';
import { barbell, basket, call, globe, heart, home, person, pin, star, trash, power } from 'ionicons/icons';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSegmentButton,
    IonIcon,
    IonButton,
    IonButtons,
    IonTab,
    IonTabButton,
    IonTabBar,
    IonTabs,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  ],
})
export class MainPage implements OnInit {
  userName: string = '';
  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']); // Redirect to login if not authenticated
    }
    addIcons({ barbell, basket, call, globe, heart, home, person, pin, star, trash, power });
    // this.userName = localStorage.getItem('userName') || 'User';
    // console.log(localStorage);
  }
  async showlogoutSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Logged out successfully!',
      duration: 2000,  // 2 seconds
      position: 'top',
      color:'success',
    });
    toast.present();
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      this.showlogoutSuccessToast();
    });
  }
  goToDeposit() {
    this.router.navigate(['/deposit']);
  }
  ngOnInit() {
    this.userName = localStorage.getItem('userName') || 'User';
  }
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
