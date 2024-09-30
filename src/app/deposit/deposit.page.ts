import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar,
  IonList,IonLabel,IonItem,IonListHeader,IonRange,IonCheckbox,
  IonToggle,IonSelectOption,IonSelect,IonInput,IonSegmentButton,IonIcon,IonSegment,
  IonRadio,IonRadioGroup,IonTextarea,IonRow,IonButton,IonAlert,ToastController} from '@ionic/angular/standalone';
import { barbell, basket, call, globe, heart, home, person, pin, star, trash, power,gitCompareSharp} from 'ionicons/icons';
// import { IonButton } from '@ionic/angular';
// import { IonRow } from '@ionic/angular';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule,IonList,IonLabel,IonItem,IonListHeader,IonRange,IonCheckbox,IonToggle,
  IonSelectOption,IonSelect,IonInput,IonSegmentButton,IonIcon,IonSegment,IonRadio,IonRadioGroup,IonTextarea,IonRow,
  IonButton,IonAlert]
})
export class DepositPage implements OnInit {
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.submitDeposition(); // Call submitDeposition on confirmation
      }
    },
  ];
  selectedTypes: (keyof typeof this.typeToSubtypeMap)[] = [];  // Allow multiple selections for type
  selectedSubtypes: string[] = [];  // Allow multiple selections for sub-types
  filteredSubtypes: string[] = [];  // This will store the filtered sub-types
  quantities: { [key: string]: number } = {};
  comments: { [key: string]: string } = {};
  selectedFiles: { [key: string]: string } = {};
  conditions: { [key: string]: string } = {};
  disposalType: string = 'pickup';
  donationAmount: number = 0;
  apparelTypes: (keyof typeof this.typeToSubtypeMap)[] = ['tops', 'bottoms', 'dresses', 'footwear', 'accessories', 'sportswear', 'sleepwear', 'undergarments'];
  // Mapping of types to sub-types
  typeToSubtypeMap = {
    tops: ['T-shirt', 'Shirt', 'Blouse', 'Sweater', 'Hoodie', 'Jacket', 'Coat'],
    bottoms: ['Jeans', 'Trousers', 'Shorts', 'Skirt', 'Leggings'],
    dresses: ['Casual Dress', 'Formal Dress', 'Gown', 'Summer Dress'],
    footwear: ['Sneakers', 'Boots', 'Sandals', 'Heels', 'Flats'],
    accessories: ['Hats', 'Scarves', 'Gloves', 'Belts', 'Bags', 'Wallets'],
    sportswear: ['Tracksuits', 'Gym Shorts', 'Sports Bras', 'Joggers', 'Activewear Tops'],
    sleepwear: ['Pajamas', 'Nightgown', 'Robe'],
    undergarments: ['Socks', 'Undershirt', 'Bra', 'Underwear'],
  };
  onFileSelected(event: Event, subtype: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.selectedFiles[subtype] = file.name;
    }
  }
  onTypeChange(event: any) {
    const selectedTypes = event.detail.value as (keyof typeof this.typeToSubtypeMap)[];
    this.filteredSubtypes = this.getFilteredSubtypes(selectedTypes);
    this.selectedSubtypes = []; // Reset selected subtypes when types change
    this.quantities = {}; // Reset quantities
  }
  getFilteredSubtypes(selectedTypes: (keyof typeof this.typeToSubtypeMap)[]): string[] {
    let subtypes: string[] = [];
    selectedTypes.forEach((type) => {
      subtypes = subtypes.concat(this.typeToSubtypeMap[type] || []);
    });
    // console.log(subtypes);
    return subtypes;
  }
  onRangeChange(event: any) {
    this.donationAmount = event.detail.value; // Update donation amount on slider change
    // console.log('Donation Amount:', this.donationAmount);
  }
  constructor(private authService: AuthService, private router: Router, private toastcontroller: ToastController) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']); // Redirect to login if not authenticated
    }
    addIcons({ barbell, basket, call, globe, heart, home, person, pin, star, trash, power,gitCompareSharp});
  }
  selectedValue: string = 'Recycle';  // default selection
  segmentChanged(event: any) {
    this.selectedValue = event.detail.value;
    console.log('Segment changed to', this.selectedValue);
  }
  ngOnInit() {
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

  submitDeposition() {
    const depositionData = {
      type: this.selectedValue,
      apparelTypes: this.selectedTypes,
      subtypes: this.selectedSubtypes,
      quantities: this.quantities,
      comments: this.comments,
      donationAmount: this.donationAmount,
      files: this.selectedFiles,
      conditions: this.conditions,
      disposalType: this.disposalType,
    };
    console.log(this.selectedFiles);
    this.authService.deposit(depositionData).subscribe(
      response => {
        console.log('Deposition submitted successfully:', response);
        this.router.navigate(['/main']).then(() => {
          this.showDepositSuccessToast();
        }); // Redirect or show a success message
      },
      error => {
        console.error('Error submitting deposition:', error);
        // Optionally show an error message
      }
    );
  }
}
