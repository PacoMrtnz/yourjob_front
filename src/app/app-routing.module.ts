import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AterrizajeComponent } from './components/aterrizaje/aterrizaje.component';
import { ContactComponent } from "./components/contact/contact.component";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { AllinscribedComponent } from './components/allinscribed/allinscribed.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';

const routes: Routes = [
  { path: "", component: AterrizajeComponent },
  { path: "contact", component: ContactComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "reset-password", component: ResetPasswordComponent },
  { path: "profile", component: ProfileComponent },
  { path: "create-profile", component: CreateProfileComponent },
  { path: "jobs", component: JobsComponent },
  { path: "allinscribed/:id", component: AllinscribedComponent },
  { path: "sitemap", component: SitemapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
