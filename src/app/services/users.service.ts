import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from '../models/users';
import { Jobs } from '../models/jobs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlAPI = "https://www.your-job.click:9000/api";

  users?: Users[];

  selectedUser: Users = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'user'
  };

  // updatedPassword = {
  //   _id: '',
  //   lastPassword: '',
  //   password: '',
  //   confirmPassword: ''
  // }

  private token;
  // headers = new HttpHeaders();
  private headers;

  constructor(private http: HttpClient) {
    this.token = this.obtainauthToken();
    // if(!this.token) {
    //   // console.log("no existe el token");
    //   // this.token = localStorage.getItem("authToken");
    //   // this.obtainauthToken();
    // } else {
    //   // this.token = localStorage.getItem("authToken");
    //   this.obtainauthToken();
    // this.token = localStorage.getItem("authToken");
    this.headers = { "Authorization": `Bearer ${this.token}` };
    // }
  }

  registerAccount(user: Users) {
    return this.http.post(this.urlAPI + "/users/register", user);
  }

  authenticateUser(user: Users) {
    return this.http.post(this.urlAPI + "/users/authenticate", user);
  }

  obtainauthToken(): any {
    return this.token = localStorage.getItem("authToken");
  }

  checkAuthUser() {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.get(this.urlAPI + "/users/authenticate", { headers: this.headers });
  }

  resetPasswordProcess(user: Users) {
    return this.http.put(this.urlAPI + "/users/reset-password", user);
  }

  resetPasswordGet(user: Users) {
    return this.http.put(`${this.urlAPI}/users/reset-password/${user._id}`, user);
  }

  getUser(_id: any) {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.get(`${this.urlAPI}/users/${_id}`, { headers: this.headers });
  }

  getUsers() {
    return this.http.get<Users[]>(this.urlAPI + "/users");
  }

  putUser(user: any) {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.put(`${this.urlAPI}/users/${user._id}`, user, { headers: this.headers });
  }

  putPasswordUser(password: any) {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.put(`${this.urlAPI}/users/change-password/${password._id}`, password, { headers: this.headers });
  }

  deleteUser(id: any) {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.delete(`${this.urlAPI}/users/${id}`, { headers: this.headers });
  }

  pushInscribedJob(job: Jobs) {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.put(`${this.urlAPI}/users/inscribe-job/${job._id}`, job, { headers: this.headers });
  }

  eliminarInscribedJob(job: Jobs) {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    // console.log(this.headers);
    return this.http.put(`${this.urlAPI}/users/deleteInscribedJob/${job._id}`, job, { headers: this.headers });
  }


}
