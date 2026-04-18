import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { jwtInterceptor } from './_helpers/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideNativeDateAdapter(),
    provideAnimationsAsync(),
    importProvidersFrom(MatDialogModule)
  ],
};
