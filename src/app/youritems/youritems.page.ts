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
  IonList,
  IonLabel,
  IonItem,
  IonFooter
} from '@ionic/angular/standalone';
// import { IonFooter } from '@ionic/angular';
@Component({
  selector: 'app-youritems',
  templateUrl: './youritems.page.html',
  styleUrls: ['./youritems.page.scss'],
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
    IonList,
    IonItem,
    IonLabel,
    IonFooter
  ],
})
export class YouritemsPage implements OnInit {
  depositions: any[] = [];
  groupedDepositions: { [key: string]: any[] } = {};
  constructor(private authService: AuthService, private router: Router,private toastcontroller: ToastController) { 
    addIcons({ barbell, basket, call, globe, heart, home, person, pin, star, trash, power });
  }

  ngOnInit() {
    this.loadDepositions();
  }
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
  async showlogoutSuccessToast() {
    const toast = await this.toastcontroller.create({
      message: 'Succesfully Logged out!',
      duration: 2000, 
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
  loadDepositions() {
    this.authService.getUserDepositions().subscribe(
      (response) => {
        this.depositions = response;
        this.groupSubtypes(); // Store depositions in the array
        console.log('Depositions loaded:', this.depositions);
      },
      (error) => {
        console.error('Error fetching depositions:', error);
      }
    );
  }
  actionImageMap: { [key: string]: string } = {
    'Donation': '../../assets/doantion.jpg',
    'Recycle': '../../assets/recycle.jpg',
    'Dispose': '../../assets/dispose.jpg',
  };
  groupSubtypes() {
    this.depositions.forEach(deposition => {
      // Ensure subtypes is an array of strings
      deposition.subtypes.forEach((subtype: string) => {  // Explicitly typed as string
        if (!this.groupedDepositions[subtype]) {
          this.groupedDepositions[subtype] = [];
        }
        this.groupedDepositions[subtype].push(deposition);
      });
    });
  }
}
