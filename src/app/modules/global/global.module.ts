import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    BrowserAnimationsModule
  ],
  schemas: [],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ]
})
export class GlobalModule { }
