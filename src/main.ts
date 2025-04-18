import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import AOS from 'aos';


platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    AOS.init({
      once: false
    });

  })
  .catch(err => console.error(err));

// AOS.init({
//   offset: 200,         // Offset (in px) from the original trigger point
//   delay: 0,           // Delay (in ms) for the animation
//   duration: 800,      // Duration (in ms) of the animation
//   easing: 'ease',     // Easing type
//         // Whether animation should happen only once
//   mirror: false,      // Whether elements should animate out while scrolling past them
//   anchorPlacement: 'top-bottom', // Defines which position of the element should trigger the animation
// });
