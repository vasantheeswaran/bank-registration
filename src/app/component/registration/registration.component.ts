import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


interface Bank {
  id?: string;
  fullName: string;
  dob: string;
  gender: string;
  nationality: string;
  address: string;
  phoneNumber: string;
  email: string;
  ssn?: string;
  passportNumber?: string;
  occupation?: string;
  employerName?: string;
  employerAddress?: string;
  annualIncome?: number;
  sourceOfIncome?: string;
  currentBanking?: string;
  accountType: string;
  accountPreferences?: string;
  username: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  banksCollection: AngularFirestoreCollection<Bank>;
  banks: Observable<Bank[]>;

  bank: Bank = {
    fullName: '',
    dob: '',
    gender: '',
    nationality: '',
    address: '',
    phoneNumber: '',
    email: '',
    accountType: '',
    username: '',
    password: '',
    securityQuestion: '',
    securityAnswer: ''
  };

  constructor(private afs: AngularFirestore) {
    this.banksCollection = this.afs.collection<Bank>('banks');
    this.banks = this.banksCollection.valueChanges({ idField: 'id' });
  }
  

  submitForm() {
    if (this.bank.id) {
      this.banksCollection.doc(this.bank.id).update(this.bank);
      console.log("update");
      const successMessage = 'Form updated successfully!';
      window.alert(successMessage);
    } else {
      this.banksCollection.add(this.bank);
      console.log("add");
      const successMessage = 'Form updated successfully!';
      window.alert(successMessage);
    }
    this.resetForm();
  }

  editBank(bank: Bank) {
    this.bank = { ...bank };
  }

  deleteBank(bankId: string) {
    this.banksCollection.doc(bankId).delete();
    window.alert('Data Deleted successfully!'); 
  }

  resetForm() {
    this.bank = {
      fullName: '',
      dob: '',
      gender: '',
      nationality: '',
      address: '',
      phoneNumber: '',
      email: '',
      accountType: '',
      username: '',
      password: '',
      securityQuestion: '',
      securityAnswer: ''
    };
  }
}

