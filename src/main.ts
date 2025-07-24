import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './Components/app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
