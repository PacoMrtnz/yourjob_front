import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Profile } from '../models/profiles';
import { Users } from '../models/users';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  urlAPI = "https://www.your-job.click:9000/api";

  profiles?: Profile[];

  profileInscribedUser: any;

  public profile?: {
    social: {
      website: "",
      github: "",
      twitter: "",
      instagram: ""
    },
    _id?: "",
    account: {
      _id: "",
      username: "",
      email: ""
    },
    avatar: "",
    curriculum: "",
    createdAt?: Date,
    updatedAt?: Date
  };

  selectedProfile: Profile = {
    account: '',
    avatar: '',
    curriculum: '',
    social: {}
  }

  updatedRRSS = {
      website: "",
      github: "",
      twitter: "",
      instagram: ""
  }

  updatedPassword = {
    _id: "",
    lastPassword: "",
    password: "",
    confirmPassword: ""
  }

  updatedUser: Users = {
    _id: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    verified: false,
    accountType: 'user',
    inscribed: [],
    createdAt: '',
    updatedAt: '',
  };

  


  lastPasswordUser: string = '';

  private token;
  private headers;

  constructor(private http: HttpClient) {
    this.token = this.obtainauthToken();
    this.headers = {"Authorization": `Bearer ${this.token}`};
  }

  obtainauthToken(): any {
    return this.token = localStorage.getItem("authToken");
  }

  getUserProfile() {
    this.obtainauthToken();
    // console.log(this.token);
    this.headers = {"Authorization": `Bearer ${this.token}`};
    return this.http.get(this.urlAPI + "/profiles/my-profile", {headers: this.headers});
  }

  getProfileByUsername(username: any) {
    this.obtainauthToken();
    this.headers = {"Authorization": `Bearer ${this.token}`};
    return this.http.get(this.urlAPI + "/profiles/profile-user/"+username, {headers: this.headers});
  }

  createProfile(fd: FormData) {
    this.obtainauthToken();
    this.headers = {"Authorization": `Bearer ${this.token}`};
    // console.log(fd.get("avatar"));
    return this.http.post(this.urlAPI + "/profiles/create-profile", fd, {headers: this.headers});
  }

  updateCV(fd: FormData) {
    this.obtainauthToken();
    this.headers = {"Authorization": `Bearer ${this.token}`};
    return this.http.post(this.urlAPI + "/profiles/curriculum-upload", fd, {headers: this.headers});
  }

  updateAvatar(fd: FormData) {
    this.obtainauthToken();
    this.headers = {"Authorization": `Bearer ${this.token}`};
    return this.http.post(this.urlAPI + "/profiles/avatar-upload", fd, {headers: this.headers});
  }

  updateRRSS(updatedRRSS: any) {
    this.obtainauthToken();
    this.headers = {"Authorization": `Bearer ${this.token}`};
    return this.http.put(this.urlAPI + "/profiles/update-profile", updatedRRSS, {headers: this.headers})
  }

  deleteProfile(id: any) {
    this.obtainauthToken();
    this.headers = {"Authorization": `Bearer ${this.token}`};
    return this.http.delete(`${this.urlAPI}/profiles/${id}`, { headers: this.headers });
  }


}


