import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideServiceWorker } from '@angular/service-worker';
import { enableIndexedDbPersistence } from 'firebase/firestore';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getFrenchPaginatorIntl } from './paginator-intl-fr';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => {
      const firestore = getFirestore();
      enableIndexedDbPersistence(firestore).catch((err) => {
        if (err.code == 'failed-precondition') {
          console.error(
            'Persistence can only be enabled in one tab at a time.'
          );
        } else if (err.code == 'unimplemented') {
          console.error('Current browser does not support persistence.');
        }
      });
      return firestore;
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() },
  ],
};
