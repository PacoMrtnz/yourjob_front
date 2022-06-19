import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ToastrModule } from "ngx-toastr";
import { NavbarComponent } from './components/navbar/navbar.component';
import { AterrizajeComponent } from './components/aterrizaje/aterrizaje.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { GotopComponent } from './components/gotop/gotop.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { AllinscribedComponent } from './components/allinscribed/allinscribed.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AterrizajeComponent,
    FooterComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    ProfileComponent,
    CreateProfileComponent,
    GotopComponent,
    JobsComponent,
    AllinscribedComponent,
    SitemapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NotifierModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    // ToastrModule.forRoot(),
    // NotifierModule.withConfig(customNotifierOptions),
    MatSnackBarModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
