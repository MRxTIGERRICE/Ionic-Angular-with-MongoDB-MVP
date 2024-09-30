import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { barbell, basket, call, globe, heart, home, person, pin, star, trash, power } from 'ionicons/icons';
import {
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
  ToastController,
  IonFooter
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
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
    IonFooter
  ],
})
export class ProfilePage implements OnInit {
  user: any;
  depositions: any[] = []; // Add this line to declare depositions
  totalDonations: number = 0;
  totalItemsDonated: number = 0;
  totalMoneyDonated: number = 0;
  constructor(private authService: AuthService, private router: Router, private toastcontroller: ToastController) { 
    addIcons({ barbell, basket, call, globe, heart, home, person, pin, star, trash, power });
  }
  loadDepositions() {
    this.authService.getUserDepositions().subscribe(
      (response) => {
        this.depositions = response;
        this.calculateTotals(); // Calculate totals after loading depositions
        console.log('Depositions loaded:', this.depositions);
      },
      (error) => {
        console.error('Error fetching depositions:', error);
      }
    );
  }
  calculateTotals() {
    this.totalDonations = this.depositions.length; // Total number of depositions
    this.totalItemsDonated = 0; // Reset count
    this.totalMoneyDonated = 0; // Reset count
    
    this.depositions.forEach(deposition => {
      // Calculate total items donated
      for (const quantity of Object.values(deposition.quantities || {})) {
        this.totalItemsDonated += quantity as number; // Accumulate quantity
      }
      // Calculate total money donated
      this.totalMoneyDonated += deposition.donationAmount || 0; // Accumulate donation amount
    });
  }
  
  ngOnInit() {
    this.loadUserProfile();
    this.loadDepositions();
  }

  loadUserProfile() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  async showlogoutSuccessToast() {
    const toast = await this.toastcontroller.create({
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
}
