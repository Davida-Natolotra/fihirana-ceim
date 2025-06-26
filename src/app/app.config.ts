import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'fihirana-ceim',
        appId: '1:173456515152:web:398265d51fa299f0b1b155',
        storageBucket: 'fihirana-ceim.firebasestorage.app',
        apiKey: 'AIzaSyC9waL0K05WYeyCksoDjYNlk6HZ-hQ-tcU',
        authDomain: 'fihirana-ceim.firebaseapp.com',
        messagingSenderId: '173456515152',
        measurementId: 'G-JNY9FV3LM2',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
