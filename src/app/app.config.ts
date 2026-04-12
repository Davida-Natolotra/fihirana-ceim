import {
  ApplicationConfig,
  isDevMode,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {initializeFirestore, provideFirestore,} from '@angular/fire/firestore';
import {provideServiceWorker} from '@angular/service-worker';
import {persistentLocalCache, persistentMultipleTabManager,} from 'firebase/firestore';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getFrenchPaginatorIntl} from './paginator-intl-fr';
import {environment} from '../environments/environment.prod';

// Register French locale
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => {
      return initializeFirestore(
        initializeApp(environment.firebase),
        {
          localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
          }),
        }
      );
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    {provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()},
  ],
};
