import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLabel,
  IonItem, IonInput } from '@ionic/angular/standalone';
  import { initializeApp } from 'firebase/app';
  import { getFirestore, collection, addDoc } from 'firebase/firestore';
  import { environment } from '../../environments/environment';  // Importa la configuración de Firebase

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class MainPage implements OnInit {
  inputNumber: number = 0;
  results: any[] = [];
  firestore: any; // Define firestore como propiedad

  constructor() {}

  ngOnInit() {
    const app = initializeApp(environment.firebaseConfig); // Inicializa la aplicación Firebase
    this.firestore = getFirestore(app); // Inicializa Firestore
  }

  async calculateMultiples() {
    this.results = [];
    for (let i = 0; i <= this.inputNumber; i++) {
      let color = 'black';
      let multiples = [];

      if (i % 3 === 0) {
        color = 'green';
        multiples.push(3);
      }

      if (i % 5 === 0) {
        if (color === 'black') {
          color = 'red';
        }
        multiples.push(5);
      }

      if (i % 7 === 0) {
        if (color === 'black') {
          color = 'blue';
        }
        multiples.push(7);
      }

      this.results.push({ number: i, color, multiples });
    }

    // Guardar la petición y resultados en Firestore
    try {
      const docRef = await addDoc(collection(this.firestore, 'requests'), {
        inputNumber: this.inputNumber,
        results: this.results
      });
      console.log('Documento guardado con ID: ', docRef.id);
    } catch (e) {
      console.error('Error al guardar en Firestore: ', e);

    }
  }
}
