import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as singleSpa from 'single-spa';

if (environment.production) {
  enableProdMode();
}

//use simple argumnets to registe an app
singleSpa.registerApplication(
  'app1',
  () => window.System.import('app1'),
  (location) => location.pathname.startsWith('/app1')
);
//use configuration object to registe an app
singleSpa.registerApplication({
  name: 'app2',
  app: () => window.System.import('app2'),
  activeWhen: '/app2',
  customProps: { token: '12345678' },
});

singleSpa.start();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
