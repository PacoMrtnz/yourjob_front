import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from '../models/users';
import { Jobs } from '../models/jobs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  urlAPI = "https://www.your-job.click:9000/api";

  listaUsernames?: any;
  listAvatares?: any[];
  listaInscribedJobs?: any[];
  listaInscribedJobsAux?: Jobs[] = [];
  listaAllInscribed?: any[];
  listaJobsGetByUsername?: Jobs[];
  auxUserInfo?: any;
  searchText: any = "";

  jobs?: Jobs[];

  selectedJob: Jobs = {
    title: '',
    slug: '',
    categoria: 'Sin categoría',
    location: 'Sin ubicación',
    description: '',
    salario: 0,
    duracion: 'Sin duración',
    horas: 0,
    author: '',
    _id: ''
  }

  private token;
  private headers;

  constructor(private http: HttpClient) {
    this.token = this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
  }

  obtainauthToken(): any {
    return this.token = localStorage.getItem("authToken");
  }

  getEmpleos(): Observable<any> {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.get<Jobs[]>(this.urlAPI + "/jobs", { headers: this.headers });
  }

  getEmpleo(id: any): Observable<Jobs> {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.get<Jobs>(this.urlAPI + "/jobs/" + id, { headers: this.headers });
  }

  altaEmpleo(empleo: Jobs): Observable<any> {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.post(this.urlAPI + "/jobs/create-job", empleo, { headers: this.headers });
    // return this.http.post(this.urlAPI + "/empleos",empleo,this.httpOptions);
  }

  editarEmpleo(empleo: Jobs): Observable<any> {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.put(this.urlAPI + "/jobs/" + empleo._id, empleo, { headers: this.headers });
  }

  borrarEmpleo(empleo: Jobs): Observable<any> {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    // const url = "http://localhost/APIRestEmpleosPHPMysql/app/borrar.php";
    // console.log(id);
    return this.http.put(this.urlAPI + "/jobs/delete/" + empleo._id, empleo, { headers: this.headers });
  }

  getAllInscribedUsers(job: Jobs) {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.get(`${this.urlAPI}/users/allinscribed/${job._id}`, { headers: this.headers });
  }

  getJobsByUsername(usernameOld: any) {
    this.obtainauthToken();
    this.headers = { "Authorization": `Bearer ${this.token}` };
    return this.http.get(`${this.urlAPI}/jobs/jobsByUsername/${usernameOld}`, { headers: this.headers });
  }

}
