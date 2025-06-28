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
import {
  getFirestore,
  initializeFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { provideServiceWorker } from '@angular/service-worker';
import {
  enableIndexedDbPersistence,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getFrenchPaginatorIntl } from './paginator-intl-fr';
import { environment } from '../environments/environment.prod';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => {
      const firestore = initializeFirestore(
        initializeApp(environment.firebase),
        {
          localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
          }),
        }
      );
      return firestore;
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() },
  ],
};
