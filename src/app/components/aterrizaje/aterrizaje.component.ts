import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilesService } from 'src/app/services/profiles.service';
import { UsersService } from 'src/app/services/users.service';
import { Jobs } from 'src/app/models/jobs';

@Component({
  selector: 'app-aterrizaje',
  templateUrl: './aterrizaje.component.html',
  styleUrls: ['./aterrizaje.component.css']
})
export class AterrizajeComponent implements OnInit {

  textoDBusqueda: any;
  avatares: any = [];
  listaEmpleos?: Jobs[];
  listaEmpleosAux?: Jobs[];
  listaCategorias: any[] = ["Administración de Empresas", "Administrativos y secretariado", "Atención al cliente", "Banca, finanzas y seguros", "I+D, PRL y medio ambiente", "Comercial, ventas", "Compras, logística y transporte", "Construcción e inmobiliaria", "Digital", "Educación, formación", "Hostelería, Turismo", "Ingeniería y producción", "Legal", "Marketing, publicidad y RRPP", "Medios, editorial y artes gráficas", "Personal de tienda y retail", "Profesionales, artes y oficios", "Recursos humanos", "Sanidad, salud y servicios sociales", "Tecnología e informática", "Telecomunicaciones"];
  listaPopularCategories?: any[] = [];

  constructor(public profilesService: ProfilesService, public usersService: UsersService, public jobsService: JobsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getJobs();
    // this.getProfile();
    this.getDataUser();
    // this.getPopularCategories();
    this.jobsService.searchText = "";

  }

  buscarJobHome(categ: any) {
    this.jobsService.searchText = categ;
    this.router.navigate(['/jobs']);
  }

  getProfile() {
    this.profilesService.getUserProfile().subscribe(
      res => {
        let profileDiv = document.getElementById("profileDiv");
        if (profileDiv) profileDiv.style.display = "block";
        // console.log(res);
        let profileData = Object.values(res);
        if (profileData[1].social.website == "") profileData[1].social.website = "Vacío";
        if (profileData[1].social.github == "") profileData[1].social.github = "Vacío";
        if (profileData[1].social.twitter == "") profileData[1].social.twitter = "Vacío";
        if (profileData[1].social.instagram == "") profileData[1].social.instagram = "Vacío";

        this.profilesService.profile = profileData[1];
        this.profilesService.updatedRRSS = profileData[1].social;
      },
      err => {
        console.log(err);
        location.href = "/create-profile";
      }
    );
  }

  getDataUser() {
    let _idUser = localStorage.getItem("userID");
    // let _id = JSON.stringify(localStorage.getItem("idUser"));
    this.usersService.getUser(_idUser).subscribe(
      res => {
        let response = Object.values(res);
        this.jobsService.auxUserInfo = res;

        let inscribed = this.jobsService.auxUserInfo.inscribed;
        let _id = this.jobsService.auxUserInfo._id;
        let username = this.jobsService.auxUserInfo.username;
        let email = this.jobsService.auxUserInfo.email;
        let password = this.jobsService.auxUserInfo.password;
        let accountType = this.jobsService.auxUserInfo.accountType;
        let verified = this.jobsService.auxUserInfo.verified;
        let createdAt = this.jobsService.auxUserInfo.createdAt;
        let updatedAt = this.jobsService.auxUserInfo.updatedAt;

        let userData = {
          "_id": _id, "username": username, "email": email, "password": password,
          "confirmPassword": password, "inscribed": [inscribed], "verified": verified, "accountType": accountType,
          "createdAt": createdAt, "updatedAt": updatedAt
        };
        this.profilesService.updatedUser = userData;
        this.jobsService.listaInscribedJobs = userData.inscribed;
        this.profilesService.updatedPassword.lastPassword = password;
        this.profilesService.updatedPassword._id = _id;
        // this.getJobs();
        // this.getInscribedJobs();
      },
      err => {
        console.log(err);
      }
    );
    // }
  }


  getJobs() {
    this.jobsService.getEmpleos().subscribe(
      res => {

        let dataUser = {
          idJob: '',
          username: '',
          avatar: ''
        }
        this.listaEmpleos = res.jobs;
        this.listaEmpleosAux = res.jobs;
        this.jobsService.jobs = res.jobs;
        if (this.jobsService.jobs) {
          this.jobsService.jobs.forEach(job => {
            this.profilesService.getProfileByUsername(job.author).subscribe(
              res => {
                let profileResponse = Object.values(res);
                this.avatares.push({
                  idJob: job._id,
                  username: job.author,
                  avatar: profileResponse[0].avatar
                });
              },
              err => {
                console.log(err);
              }
            );
          });
          this.getPopularCategories();
        }

      },
      err => {
        console.log(err);
      }
    );
  }


  getPopularCategories() {
    this.listaEmpleosAux = this.jobsService.jobs;
    this.listaCategorias.forEach((categ) => {
      if (this.listaEmpleosAux) {
        this.listaPopularCategories?.push({ categoria: categ, registros: this.listaEmpleosAux?.filter(job => job.categoria == categ).length });
      }
    });

    this.listaPopularCategories = this.listaPopularCategories?.sort((a, b) => b.registros - a.registros);
    this.listaPopularCategories = this.listaPopularCategories?.slice(0, 3);
    // console.log(this.listaPopularCategories);
  }
}
