import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { Jobs } from 'src/app/models/jobs';
import { Users } from 'src/app/models/users';
import { JobsService } from 'src/app/services/jobs.service';
import { ProfilesService } from 'src/app/services/profiles.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  p: number = 1;
  p2: number = 1;
  // searchText: any;
  listaCategorias: any[] = ["Administración de Empresas", "Administrativos y secretariado", "Atención al cliente", "Banca, finanzas y seguros", "I+D, PRL y medio ambiente", "Comercial, ventas", "Compras, logística y transporte", "Construcción e inmobiliaria", "Digital", "Educación, formación", "Hostelería, Turismo", "Ingeniería y producción", "Legal", "Marketing, publicidad y RRPP", "Medios, editorial y artes gráficas", "Personal de tienda y retail", "Profesionales, artes y oficios", "Recursos humanos", "Sanidad, salud y servicios sociales", "Tecnología e informática", "Telecomunicaciones"];
  avatares: any = [];
  listaEmpleos?: Jobs[];
  listaEmpleosAux?: Jobs[];
  inscribedJobText?: any;
  empleo: Jobs = {
    title: '',
    slug: '',
    categoria: 'Sin categoría',
    location: 'Sin ubicación',
    description: '',
    salario: 0,
    duracion: '',
    horas: 0,
    author: '',
    _id: ''
  };


  constructor(public jobsService: JobsService, public profilesService: ProfilesService, public usersService: UsersService, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getJobs();
    this.getProfile();
    this.getDataUser();
    this.inscribedJobText = "Inscribirse";
    // this.getInscribedJobs();
  }

  ngAfterViewInit() {
    this.filtrarXCategoria(this.jobsService.searchText);
    // this.getJobs();
    // this.getProfile();
    // this.getDataUser();
  }

  key: string = 'updatedAt';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  key2: string = 'updatedAt';
  reverse2: boolean = true;
  sort2(key2: string) {
    this.key2 = key2;
    this.reverse2 = !this.reverse2;
  }
  // sortReverse(key: string) {
  //   this.key = key;
  //   this.reverse = !this.reverse;
  // }

  // onChange(valorOrden: any) {
  //   this.sort(valorOrden.target.value);
  // }

  // onChangeReverse(valorOrden: any) {
  //   this.sortReverse(valorOrden.target.value);
  // }

  hideCategorias() {
    let contenidoCategorias = document.getElementById("hideOrShowCategorias");
    if (contenidoCategorias) contenidoCategorias.style.display = "none";
    let iconShow = document.getElementById("iconShow");
    if (iconShow) iconShow.style.display = "inline";
    let iconHide = document.getElementById("iconHide");
    if (iconHide) iconHide.style.display = "none";
  }

  showCategorias() {
    let contenidoCategorias = document.getElementById("hideOrShowCategorias");
    if (contenidoCategorias) contenidoCategorias.style.display = "inline";
    let iconHide = document.getElementById("iconHide");
    if (iconHide) iconHide.style.display = "inline";
    let iconShow = document.getElementById("iconShow");
    if (iconShow) iconShow.style.display = "none";
  }

  filtrarXCategoria(categ: any) {
    this.jobsService.searchText = categ;
    let existeCateg = false;
    let listaEnlacesCategs = document.getElementsByName("listaEnlacesCategs");
    if (listaEnlacesCategs) {
      listaEnlacesCategs.forEach(element => {
        element.className = "list-group-item list-group-item-action bg-dark text-light";
        // console.log(element.getAttribute("id"));
        if (categ == element.getAttribute("id")) {
          existeCateg = true;
        }
      });
    }
    if (categ === "" || !existeCateg) {
      let elementAllCategs = document.getElementById("Todas las Categorías");
      if (elementAllCategs) elementAllCategs.className = "list-group-item list-group-item-action bg-secondary text-light";
    }
    let selectedElementCategs = document.getElementById(categ);
    if (selectedElementCategs) selectedElementCategs.className = "list-group-item list-group-item-action bg-secondary text-light";
    // event.target.className = ;
  }

  closeNotificationPostJob() {
    var notificationPostJob = document.getElementById("notificationPostJob");
    if (notificationPostJob) notificationPostJob.innerHTML = "";
  }

  closeNotification() {
    var notification = document.getElementById("notification");
    if (notification) notification.innerHTML = "";
    var centrado = document.getElementById("centrado");
    if (centrado) centrado.style.visibility = "hidden";
  }

  closeNotificationInscribedJob() {
    var notificationInscribedJob = document.getElementById("notificationInscribedJob");
    if (notificationInscribedJob) notificationInscribedJob.innerHTML = "";
  }
  // closeNotification2() {
  //   var notificationJobDetails = document.getElementById("notificationJobDetails");
  //   if (notificationJobDetails) notificationJobDetails.innerHTML = "";

  // }

  // closeNotificationEditJob() {
  //   var notificationEditJob = document.getElementById("notificationEditJob");
  //   if (notificationEditJob) notificationEditJob.innerHTML = "";
  // }


  checkInscribedJob(idJob: any) {
    // console.log(idJob);
    // console.log(this.jobsService.listaInscribedJobs);
    if (this.jobsService.listaInscribedJobs) {
      this.inscribedJobText = "Inscribirse";

      this.jobsService.listaInscribedJobs[0].forEach((inscribedJob: any) => {
        // console.log(inscribedJob);
        // console.log(idJob);
        if (inscribedJob == idJob) {
          // console.log("yessssssssss");
          this.inscribedJobText = "Inscrito";
          let jobInscribeBtn = document.getElementById("jobInscribeBtn-" + idJob);
          let iconInscribedJob = document.getElementById("iconInscribedJob-" + idJob);
          if (jobInscribeBtn) {
            jobInscribeBtn.style.cursor = "no-drop";
            jobInscribeBtn?.setAttribute("disabled", 'disabled');
            jobInscribeBtn.title = "Ya estás inscrito";
          }
          if (iconInscribedJob) {
            // console.log(iconInscribedJob);
            iconInscribedJob.className = "fas fa-user-check";
          }
          let jobInscribeBtn2 = document.getElementById("jobInscribeBtn2-" + idJob);
          let iconInscribedJob2 = document.getElementById("iconInscribedJob2-" + idJob);
          if (jobInscribeBtn2) {
            jobInscribeBtn2.style.cursor = "no-drop";
            jobInscribeBtn2?.setAttribute("disabled", 'disabled');
            jobInscribeBtn2.title = "Ya estás inscrito";
          }
          if (iconInscribedJob2) {
            // console.log(iconInscribedJob);
            iconInscribedJob2.className = "fas fa-user-check";
          }

        };
      });
    }

    // if(this.jobsService.listaInscribedJobs)
    //   return this.jobsService.listaInscribedJobs[0];
  }

  getInscribedJobs() {
    let responseInscribedJob: any;
    this.jobsService.listaInscribedJobsAux = [];
    if (this.jobsService.listaInscribedJobs) {
      this.jobsService.listaInscribedJobs[0].forEach((inscribedJob: any) => {
        this.jobsService.getEmpleo(inscribedJob).subscribe(
          res => {
            responseInscribedJob = res;
            // console.log(responseInscribedJob.job);
            this.jobsService.listaInscribedJobsAux?.push(responseInscribedJob.job);
          },
          err => {
            console.log(err);
          }
        );
      });
      // console.log(this.jobsService.listaInscribedJobsAux);
    }
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
        this.router.navigate(["/create-profile"]);
        // location.href = "/create-profile";
      }
    );
  }

  getDataUser() {
    let _idUser = localStorage.getItem("userID");
    // let _id = JSON.stringify(localStorage.getItem("idUser"));
    this.usersService.getUser(_idUser).subscribe(
      res => {
        // console.log(res);
        let response = Object.values(res);
        this.jobsService.auxUserInfo = res;
        // console.log(this.jobsService.auxUserInfo.inscribed);

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

        // console.log(res);
        let dataUser = {
          idJob: '',
          username: '',
          avatar: ''
        }
        this.listaEmpleos = res.jobs;
        this.listaEmpleosAux = res.jobs;
        this.jobsService.jobs = res.jobs;
        // console.log(this.jobsService.jobs);
        if (this.jobsService.jobs) {
          this.jobsService.jobs.forEach(job => {
            this.profilesService.getProfileByUsername(job.author).subscribe(
              res => {
                let profileResponse = Object.values(res);
                // console.log(profileResponse);
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
          // console.log(this.avatares);

        }
        // console.log(this.jobsService.listaUsernames);

      },
      err => {
        console.log(err);
      }
    );
  }

  createJob(form: NgForm) {
    this.jobsService.selectedJob = form.value;
    // console.log(this.jobsService.selectedJob);


    //Validations for Title
    if (form.value.title == "") {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errTitle";
      document.getElementById("errTitle")?.remove();
      let inputTitle = document.getElementById("title");
      if (inputTitle) {
        spanError.innerHTML = "No puede ser un campo vacío";
        inputTitle.parentNode?.insertBefore(spanError, null);
        inputTitle.style.borderColor = "red";
      }
    } else {
      let inputTitle = document.getElementById("title");
      if (inputTitle) inputTitle.style.borderColor = "green";
      document.getElementById("errTitle")?.remove();
    }

    //Validations for Description
    if (form.value.description == "") {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errDescription";
      document.getElementById("errDescription")?.remove();
      let inputDescription = document.getElementById("description");
      if (inputDescription) {
        spanError.innerHTML = "No puede ser un campo vacío";
        inputDescription.parentNode?.insertBefore(spanError, null);
        inputDescription.style.borderColor = "red";
      }
    } else {
      let inputDescription = document.getElementById("description");
      if (inputDescription) inputDescription.style.borderColor = "green";
      document.getElementById("errDescription")?.remove();
    }

    //Validations for Author
    if (form.value.author == "") {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errAuthor";
      document.getElementById("errAuthor")?.remove();
      let inputAuthor = document.getElementById("author");
      if (inputAuthor) {
        spanError.innerHTML = "No puede ser un campo vacío";
        inputAuthor.parentNode?.insertBefore(spanError, null);
        inputAuthor.style.borderColor = "red";
      }
    } else {
      let inputAuthor = document.getElementById("author");
      if (inputAuthor) inputAuthor.style.borderColor = "green";
      document.getElementById("errAuthor")?.remove();
    }

    //Validations for Salario
    if (form.value.salario < 0 || form.value.salario > 500000) {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errSalario";
      document.getElementById("errSalario")?.remove();
      let inputSalario = document.getElementById("salario");
      if (inputSalario) {
        spanError.innerHTML = "Debe ser un número entre 0 y 500000";
        inputSalario.parentNode?.insertBefore(spanError, null);
        inputSalario.style.borderColor = "red";
      }
    } else {
      let inputSalario = document.getElementById("salario");
      if (inputSalario) inputSalario.style.borderColor = "green";
      document.getElementById("errSalario")?.remove();
    }

    //Validations for Horas
    if (form.value.horas < 0 || form.value.horas > 40) {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errHoras";
      document.getElementById("errHoras")?.remove();
      let inputHoras = document.getElementById("horas");
      if (inputHoras) {
        spanError.innerHTML = "Debe ser un número entre 0 y 40";
        inputHoras.parentNode?.insertBefore(spanError, null);
        inputHoras.style.borderColor = "red";
      }
    } else {
      let inputHoras = document.getElementById("horas");
      if (inputHoras) inputHoras.style.borderColor = "green";
      document.getElementById("errHoras")?.remove();
    }


    this.jobsService.altaEmpleo(this.jobsService.selectedJob).subscribe(
      res => {
        // console.log(res);
        let response = Object.values(res);
        console.log(response);

        var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align: left">
              <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  style="cursor: initial;" role="alert" data-brk-library="component__alert">
                  <div class="row">
                      <div class="col-md-10 mt-1 text-left">
                          <i class="start-icon far fa-check-circle faa-tada animated"></i>
                          ${response[2]}
                      </div>
                      <div class="col-md-2" style="text-align: right;">
                          <button id="btnCloseNotificationCreateJob" (click)="closeNotification(notificationRegister)" type="button"
                              class="btn close font__size-18" data-dismiss="alert"
                              title="Cerrar notificación">
                              <span aria-hidden="true"><a>
                                      <i class="fa fa-times blue-cross"></i>
                                  </a></span>
                              <span class="sr-only">Close</span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;

        let notificationPostJob = document.getElementById("notificationPostJob");
        while (notificationPostJob?.firstChild) {
          notificationPostJob.removeChild(notificationPostJob.firstChild);
        };
        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;
        divPrincipal.className = "mt-3";
        notificationPostJob?.appendChild(divPrincipal);
        let btnCloseNotificationPostJob = document.getElementById("btnCloseNotificationPostJob");
        btnCloseNotificationPostJob?.addEventListener("click", this.closeNotificationPostJob);

        let title = document.getElementById("title");
        if (title) title.style.borderColor = "green";
        let author = document.getElementById("author");
        if (author) author.style.borderColor = "green";
        let localization = document.getElementById("location");
        if (localization) localization.style.borderColor = "green";
        let categoria = document.getElementById("categoria");
        if (categoria) categoria.style.borderColor = "green";
        let salario = document.getElementById("salario");
        if (salario) salario.style.borderColor = "green";
        let horas = document.getElementById("horas");
        if (horas) horas.style.borderColor = "green";
        let duracion = document.getElementById("duracion");
        if (duracion) duracion.style.borderColor = "green";
        let description = document.getElementById("description");
        if (description) description.style.borderColor = "green";

        // this.getUsers();
        form.reset();

        let intervalo = setInterval(() => {
          document.getElementById("closeModalPostJob")?.click();
          this.closeNotificationPostJob();
          form.reset();
          location.href = "/jobs";
          clearInterval(intervalo);
        }, 3000);

      },
      err => {
        console.log(err);
        let response = Object.values(err);
        let objectMsgError = Object.assign({}, response[7]);
        let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

        // console.log(response);
        let objectMsgValidation = Object.assign({}, response[7]);
        let msgsValidation: any = Object.values(objectMsgValidation)[0];
        // console.log(msgsValidation);

        var contenido = '';
        if (msgsValidation) {
          let validationErrors: any[] = [];
          msgsValidation.forEach((msgError: any) => {
            // console.log(msgError.msg);
            validationErrors.push(" " + msgError.msg);
          });
          // console.log(validationErrors);

          contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align:left;">
          <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
              style="cursor: initial;" role="alert" data-brk-library="component__alert">
              <div class="row">
                  <div class="col-md-10 mt-1">
                      <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                      ${validationErrors}
                  </div>
                  <div class="col-md-2" style="text-align: right;">
                      <button id="btnCloseNotificationPostJob" (click)="closeNotification()" type="button"
                          class="btn close font__size-18" data-dismiss="alert" title="Cerrar notificación">
                          <span aria-hidden="true">
                              <i class="fa fa-times danger"></i>
                          </span>
                          <span class="sr-only">Close</span>
                      </button>
                  </div>
              </div>
          </div>
        </div>
      </div>`;

        }

        if (msgError) {
          contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align:left;">
          <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
              style="cursor: initial;" role="alert" data-brk-library="component__alert">
              <div class="row">
                  <div class="col-md-10 mt-1">
                      <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                      ${Object.values(objectMsgError)[1]}
                  </div>
                  <div class="col-md-2" style="text-align: right;">
                      <button id="btnCloseNotificationPostJob" (click)="closeNotification()" type="button"
                          class="btn close font__size-18" data-dismiss="alert" title="Cerrar notificación">
                          <span aria-hidden="true">
                              <i class="fa fa-times danger"></i>
                          </span>
                          <span class="sr-only">Close</span>
                      </button>
                  </div>
              </div>
          </div>
        </div>
      </div>`;
        }

        let notificationPostJob = document.getElementById("notificationPostJob");
        while (notificationPostJob?.firstChild) {
          notificationPostJob.removeChild(notificationPostJob.firstChild);
        };
        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;
        divPrincipal.className = "mt-3";
        notificationPostJob?.appendChild(divPrincipal);
        let btnCloseNotificationPostJob = document.getElementById("btnCloseNotificationPostJob");
        btnCloseNotificationPostJob?.addEventListener("click", this.closeNotificationPostJob);

      }
    )
  }

  editJob(updatedJobForm: NgForm) {
    // console.log(updatedJobForm.value);
    //Validations for Title
    // console.log(updatedJobForm.value.title.length);
    if (updatedJobForm.value.title == "") {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errTitle";
      document.getElementById("errTitle")?.remove();
      let inputTitle = document.getElementById("updatedJobtitle");
      if (inputTitle) {
        spanError.innerHTML = "No puede ser un campo vacío";
        inputTitle.parentNode?.insertBefore(spanError, null);
        inputTitle.style.borderColor = "red";
      }
    } else {
      let inputTitle = document.getElementById("updatedJobtitle");
      if (inputTitle) inputTitle.style.borderColor = "green";
      document.getElementById("errTitle")?.remove();
    }

    //Validations for Description
    if (updatedJobForm.value.description == "") {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errDescription";
      document.getElementById("errDescription")?.remove();
      let inputDescription = document.getElementById("updatedJobdescription");
      if (inputDescription) {
        spanError.innerHTML = "No puede ser un campo vacío";
        inputDescription.parentNode?.insertBefore(spanError, null);
        inputDescription.style.borderColor = "red";
      }
    } else {
      let inputDescription = document.getElementById("updatedJobdescription");
      if (inputDescription) inputDescription.style.borderColor = "green";
      document.getElementById("errDescription")?.remove();
    }

    //Validations for Author
    if (updatedJobForm.value.author == "") {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errAuthor";
      document.getElementById("errAuthor")?.remove();
      let inputAuthor = document.getElementById("updatedJobauthor");
      if (inputAuthor) {
        spanError.innerHTML = "No puede ser un campo vacío";
        inputAuthor.parentNode?.insertBefore(spanError, null);
        inputAuthor.style.borderColor = "red";
      }
    } else {
      let inputAuthor = document.getElementById("updatedJobauthor");
      if (inputAuthor) inputAuthor.style.borderColor = "green";
      document.getElementById("errAuthor")?.remove();
    }

    //Validations for Salario
    if (updatedJobForm.value.salario < 0 || updatedJobForm.value.salario > 500000) {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errSalario";
      document.getElementById("errSalario")?.remove();
      let inputSalario = document.getElementById("updatedJobsalario");
      if (inputSalario) {
        spanError.innerHTML = "No puede ser menor que 0";
        inputSalario.parentNode?.insertBefore(spanError, null);
        inputSalario.style.borderColor = "red";
      }
    } else {
      let inputSalario = document.getElementById("updatedJobsalario");
      if (inputSalario) inputSalario.style.borderColor = "green";
      document.getElementById("errSalario")?.remove();
    }

    //Validations for Horas
    if (updatedJobForm.value.horas < 0 || updatedJobForm.value.horas > 40) {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errHoras";
      document.getElementById("errHoras")?.remove();
      let inputHoras = document.getElementById("updatedJobhoras");
      if (inputHoras) {
        spanError.innerHTML = "No puede ser menor que 0";
        inputHoras.parentNode?.insertBefore(spanError, null);
        inputHoras.style.borderColor = "red";
      }
    } else {
      let inputHoras = document.getElementById("updatedJobhoras");
      if (inputHoras) inputHoras.style.borderColor = "green";
      document.getElementById("errHoras")?.remove();
    }


    this.jobsService.editarEmpleo(updatedJobForm.value).subscribe(
      res => {
        // console.log(res);
        let response = Object.values(res);
        // console.log(response);

        var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align: left">
              <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  style="cursor: initial;" role="alert" data-brk-library="component__alert">
                  <div class="row">
                      <div class="col-md-10 mt-1 text-left">
                          <i class="start-icon far fa-check-circle faa-tada animated"></i>
                          ${response[2]}
                      </div>
                      <div class="col-md-2" style="text-align: right;">
                          <button id="btnCloseNotificationEditJob-${updatedJobForm.value._id}" type="button"
                              class="btn close font__size-18" data-dismiss="alert"
                              title="Cerrar notificación">
                              <span aria-hidden="true"><a>
                                      <i class="fa fa-times blue-cross"></i>
                                  </a></span>
                              <span class="sr-only">Close</span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;

        let notificationEditJob = document.getElementById("notificationEditJob-" + updatedJobForm.value._id);
        while (notificationEditJob?.firstChild) {
          notificationEditJob.removeChild(notificationEditJob.firstChild);
        };
        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;
        divPrincipal.className = "mt-3";
        notificationEditJob?.appendChild(divPrincipal);
        let btnCloseNotificationEditJob = document.getElementById("btnCloseNotificationEditJob-" + updatedJobForm.value._id);
        btnCloseNotificationEditJob?.addEventListener("click", function () {
          closeNotificationEditJob(updatedJobForm.value._id);
        });

        let title = document.getElementById("updatedJobtitle");
        if (title) title.style.borderColor = "green";
        let author = document.getElementById("updatedJobauthor");
        if (author) author.style.borderColor = "green";
        let localization = document.getElementById("updatedJoblocation");
        if (localization) localization.style.borderColor = "green";
        let categoria = document.getElementById("updatedJobcategoria");
        if (categoria) categoria.style.borderColor = "green";
        let salario = document.getElementById("updatedJobsalario");
        if (salario) salario.style.borderColor = "green";
        let horas = document.getElementById("updatedJobhoras");
        if (horas) horas.style.borderColor = "green";
        let duracion = document.getElementById("updatedJobduracion");
        if (duracion) duracion.style.borderColor = "green";
        let description = document.getElementById("updatedJobdescription");
        if (description) description.style.borderColor = "green";

        // this.getUsers();
        // updatedJobForm.reset();

        let intervalo = setInterval(() => {
          document.getElementById("closeModalEditJob")?.click();
          closeNotificationEditJob(updatedJobForm.value._id);
          updatedJobForm.reset();
          window.location.reload();
          // location.href = "/jobs";
          clearInterval(intervalo);
        }, 3000);
      },
      err => {
        // console.log(err);
        let response = Object.values(err);
        let objectMsgError = Object.assign({}, response[7]);
        let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

        // console.log(response);
        let objectMsgValidation = Object.assign({}, response[7]);
        let msgsValidation: any = Object.values(objectMsgValidation)[0];
        // console.log(msgsValidation);

        var contenido = '';
        if (msgsValidation) {
          let validationErrors: any[] = [];
          msgsValidation.forEach((msgError: any) => {
            // console.log(msgError.msg);
            validationErrors.push(" " + msgError.msg);
          });
          // console.log(validationErrors);



          contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align:left;">
          <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
              style="cursor: initial;" role="alert" data-brk-library="component__alert">
              <div class="row">
                  <div class="col-md-10 mt-1">
                      <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                      ${validationErrors}
                  </div>
                  <div class="col-md-2" style="text-align: right;">
                      <button id="btnCloseNotificationEditJob-${updatedJobForm.value._id}" type="button"
                          class="btn close font__size-18" data-dismiss="alert" title="Cerrar notificación">
                          <span aria-hidden="true">
                              <i class="fa fa-times danger"></i>
                          </span>
                          <span class="sr-only">Close</span>
                      </button>
                  </div>
              </div>
          </div>
        </div>
      </div>`;

        }

        if (msgError) {
          contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align:left;">
          <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
              style="cursor: initial;" role="alert" data-brk-library="component__alert">
              <div class="row">
                  <div class="col-md-10 mt-1">
                      <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                      ${Object.values(objectMsgError)[1]}
                  </div>
                  <div class="col-md-2" style="text-align: right;">
                      <button id="btnCloseNotificationEditJob-${updatedJobForm.value._id}" type="button"
                          class="btn close font__size-18" data-dismiss="alert" title="Cerrar notificación">
                          <span aria-hidden="true">
                              <i class="fa fa-times danger"></i>
                          </span>
                          <span class="sr-only">Close</span>
                      </button>
                  </div>
              </div>
          </div>
        </div>
      </div>`;
        }

        let notificationEditJob = document.getElementById("notificationEditJob-" + updatedJobForm.value._id);
        while (notificationEditJob?.firstChild) {
          notificationEditJob.removeChild(notificationEditJob.firstChild);
        };
        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;
        divPrincipal.className = "mt-3";
        notificationEditJob?.appendChild(divPrincipal);
        let btnCloseNotificationEditJob = document.getElementById("btnCloseNotificationEditJob-" + updatedJobForm.value._id);
        btnCloseNotificationEditJob?.addEventListener("click", function () {
          closeNotificationEditJob(updatedJobForm.value._id);
        });

      }
    );
  }



  inscribeJob(job: Jobs) {
    // console.log(job);
    // console.log(job._id);

    this.usersService.pushInscribedJob(job).subscribe(
      res => {
        // console.log(res);
        let response = Object.values(res);
        var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align: left">
              <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  style="cursor: initial;" role="alert" data-brk-library="component__alert">
                  <div class="row">
                      <div class="col-md-10 mt-1 text-left">
                          <i class="start-icon far fa-check-circle faa-tada animated"></i>
                          ${response[1]}
                      </div>
                      <div class="col-md-2" style="text-align: right;">
                          <button id="btnCloseNotification" type="button"
                              class="btn close font__size-18" data-dismiss="alert"
                              title="Cerrar notificación">
                              <span aria-hidden="true"><a>
                                      <i class="fa fa-times blue-cross"></i>
                                  </a></span>
                              <span class="sr-only">Close</span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;

        var contenido2 = `<div id="notificationRegister2">
          <div class="col-sm-12" style="text-align: left">
              <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  style="cursor: initial;" role="alert" data-brk-library="component__alert">
                  <div class="row">
                      <div class="col-md-10 mt-1 text-left">
                          <i class="start-icon far fa-check-circle faa-tada animated"></i>
                          ${response[1]}
                      </div>
                      <div class="col-md-2" style="text-align: right;">
                          <button id="btnCloseNotification2" type="button"
                              class="btn close font__size-18" data-dismiss="alert"
                              title="Cerrar notificación">
                              <span aria-hidden="true"><a>
                                      <i class="fa fa-times blue-cross"></i>
                                  </a></span>
                              <span class="sr-only">Close</span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;


        let notification = document.getElementById("notification");
        let centrado = document.getElementById("centrado");
        while (notification?.firstChild) {
          notification.removeChild(notification.firstChild);
        };
        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;
        divPrincipal.className = "mt-3";
        notification?.appendChild(divPrincipal);
        if (centrado) centrado.style.visibility = "visible";

        let btnCloseNotification = document.getElementById("btnCloseNotification");
        btnCloseNotification?.addEventListener("click", this.closeNotification);


        let notificationjobDetails = document.getElementById("notificationJobDetails-" + job._id);
        // console.log(notificationjobDetails);
        while (notificationjobDetails?.firstChild) {
          notificationjobDetails.removeChild(notificationjobDetails.firstChild);
        };
        var divPrincipal2 = document.createElement("div");
        divPrincipal2.innerHTML = contenido2;
        divPrincipal2.className = "mt-3";
        notificationjobDetails?.appendChild(divPrincipal2);

        let btnCloseNotification2 = document.getElementById("btnCloseNotification2");
        btnCloseNotification2?.addEventListener("click", function () {
          closeNotificationDetailsJob(job._id);
        });

        let intervalo = setInterval(() => {
          this.closeNotification();
          closeNotificationDetailsJob(job._id);
          window.location.reload();
          clearInterval(intervalo);
        }, 3000);
      },
      err => {
        // console.log(err);
        let response = Object.values(err);
        let objectMsgError = Object.assign({}, response[7]);
        let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

        if (msgError) {
          var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align:left;">
          <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
              style="cursor: initial;" role="alert" data-brk-library="component__alert">
              <div class="row">
                  <div class="col-md-10 mt-1">
                      <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                      ${Object.values(objectMsgError)[1]}
                  </div>
                  <div class="col-md-2" style="text-align: right;">
                      <button id="btnCloseNotification" (click)="closeNotification()" type="button"
                          class="btn close font__size-18" data-dismiss="alert" title="Cerrar notificación">
                          <span aria-hidden="true">
                              <i class="fa fa-times danger"></i>
                          </span>
                          <span class="sr-only">Close</span>
                      </button>
                  </div>
              </div>
          </div>
        </div>
      </div>`;

          let notification = document.getElementById("notification");
          let centrado = document.getElementById("centrado");
          while (notification?.firstChild) {
            notification.removeChild(notification.firstChild);
          };
          var divPrincipal = document.createElement("div");
          divPrincipal.innerHTML = contenido;
          divPrincipal.className = "mt-3";
          notification?.appendChild(divPrincipal);
          if (centrado) centrado.style.visibility = "visible";
          let btnCloseNotification = document.getElementById("btnCloseNotification");
          btnCloseNotification?.addEventListener("click", this.closeNotification);
        }
      }
    );
  }

  eliminarInscribedJob(job: Jobs) {
    // console.log(job);
    this.usersService.eliminarInscribedJob(job).subscribe(
      res => {
        // console.log(res);
        let response = Object.values(res);
        var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align: left">
              <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  style="cursor: initial;" role="alert" data-brk-library="component__alert">
                  <div class="row">
                      <div class="col-md-10 mt-1 text-left">
                          <i class="start-icon far fa-check-circle faa-tada animated"></i>
                          ${response[1]}
                      </div>
                      <div class="col-md-2" style="text-align: right;">
                          <button id="btnCloseNotification" type="button"
                              class="btn close font__size-18" data-dismiss="alert"
                              title="Cerrar notificación">
                              <span aria-hidden="true"><a>
                                      <i class="fa fa-times blue-cross"></i>
                                  </a></span>
                              <span class="sr-only">Close</span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;

        let notificationInscribedJob = document.getElementById("notificationInscribedJob");
        while (notificationInscribedJob?.firstChild) {
          notificationInscribedJob.removeChild(notificationInscribedJob.firstChild);
        };
        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;
        divPrincipal.className = "mt-3";
        notificationInscribedJob?.appendChild(divPrincipal);

        let btnCloseNotificationInscribedJob = document.getElementById("btnCloseNotificationInscribedJob");
        btnCloseNotificationInscribedJob?.addEventListener("click", this.closeNotificationInscribedJob);

        let intervalo = setInterval(() => {
          this.closeNotificationInscribedJob();
          window.location.reload();
          clearInterval(intervalo);
        }, 3000);
      },
      err => {
        // console.log(err);
        let response = Object.values(err);
        let objectMsgError = Object.assign({}, response[7]);
        let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

        if (msgError) {
          var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align:left;">
          <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
              style="cursor: initial;" role="alert" data-brk-library="component__alert">
              <div class="row">
                  <div class="col-md-10 mt-1">
                      <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                      ${Object.values(objectMsgError)[1]}
                  </div>
                  <div class="col-md-2" style="text-align: right;">
                      <button id="btnCloseNotificationInscribedJob" (click)="closeNotification()" type="button"
                          class="btn close font__size-18" data-dismiss="alert" title="Cerrar notificación">
                          <span aria-hidden="true">
                              <i class="fa fa-times danger"></i>
                          </span>
                          <span class="sr-only">Close</span>
                      </button>
                  </div>
              </div>
          </div>
        </div>
      </div>`;

          let notificationInscribedJob = document.getElementById("notificationInscribedJob");
          while (notificationInscribedJob?.firstChild) {
            notificationInscribedJob.removeChild(notificationInscribedJob.firstChild);
          };
          var divPrincipal = document.createElement("div");
          divPrincipal.innerHTML = contenido;
          divPrincipal.className = "mt-3";
          notificationInscribedJob?.appendChild(divPrincipal);
          let btnCloseNotificationInscribedJob = document.getElementById("btnCloseNotificationInscribedJob");
          btnCloseNotificationInscribedJob?.addEventListener("click", this.closeNotificationInscribedJob);
        }
      }
    );
  }

  deleteJob(job: Jobs) {
    if (confirm("La opción será irreversible. ¿Quiere eliminar el empleo para siempre?")) {
      // console.log(job);
      this.jobsService.borrarEmpleo(job).subscribe(
        res => {
          // console.log(res);
          // console.log(res);
          let response = Object.values(res);
          var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align: left">
              <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  style="cursor: initial;" role="alert" data-brk-library="component__alert">
                  <div class="row">
                      <div class="col-md-10 mt-1 text-left">
                          <i class="start-icon far fa-check-circle faa-tada animated"></i>
                          ${response[1]}
                      </div>
                      <div class="col-md-2" style="text-align: right;">
                          <button id="btnCloseNotification" type="button"
                              class="btn close font__size-18" data-dismiss="alert"
                              title="Cerrar notificación">
                              <span aria-hidden="true"><a>
                                      <i class="fa fa-times blue-cross"></i>
                                  </a></span>
                              <span class="sr-only">Close</span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;


          let notificationjobDetails = document.getElementById("notificationJobDetails-" + job._id);
          // console.log(notificationjobDetails);
          while (notificationjobDetails?.firstChild) {
            notificationjobDetails.removeChild(notificationjobDetails.firstChild);
          };
          var divPrincipal2 = document.createElement("div");
          divPrincipal2.innerHTML = contenido;
          divPrincipal2.className = "mt-3";
          notificationjobDetails?.appendChild(divPrincipal2);

          let btnCloseNotification = document.getElementById("btnCloseNotification");
          btnCloseNotification?.addEventListener("click", function () {
            closeNotificationDetailsJob(job._id);
          });

          let intervalo = setInterval(() => {
            this.closeNotification();
            closeNotificationDetailsJob(job._id);
            window.location.reload();
            clearInterval(intervalo);
          }, 3000);
        },
        err => {
          // console.log(err);
          let response = Object.values(err);
          let objectMsgError = Object.assign({}, response[7]);
          let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

          if (msgError) {
            var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align:left;">
          <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
              style="cursor: initial;" role="alert" data-brk-library="component__alert">
              <div class="row">
                  <div class="col-md-10 mt-1">
                      <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                      ${Object.values(objectMsgError)[1]}
                  </div>
                  <div class="col-md-2" style="text-align: right;">
                      <button id="btnCloseNotification" (click)="closeNotification()" type="button"
                          class="btn close font__size-18" data-dismiss="alert" title="Cerrar notificación">
                          <span aria-hidden="true">
                              <i class="fa fa-times danger"></i>
                          </span>
                          <span class="sr-only">Close</span>
                      </button>
                  </div>
              </div>
          </div>
        </div>
      </div>`;

            let notificationjobDetails = document.getElementById("notificationJobDetails-" + job._id);
            // console.log(notificationjobDetails);
            while (notificationjobDetails?.firstChild) {
              notificationjobDetails.removeChild(notificationjobDetails.firstChild);
            };
            var divPrincipal2 = document.createElement("div");
            divPrincipal2.innerHTML = contenido;
            divPrincipal2.className = "mt-3";
            notificationjobDetails?.appendChild(divPrincipal2);

            let btnCloseNotification = document.getElementById("btnCloseNotification");
            btnCloseNotification?.addEventListener("click", function () {
              closeNotificationDetailsJob(job._id);
            });
          }
        }
      );
    }

  }


  getAllInscribed(job: Jobs) {
    document.getElementById("closeModalJobDetails-"+job._id)?.click();
    this.router.navigate([`/allinscribed/${job._id}`]);
    // console.log(job);
    this.jobsService.getAllInscribedUsers(job).subscribe(
      res => {
        // console.log(res);
        var response: any;
        response = res;
        this.jobsService.listaAllInscribed = response.usuarios;

        this.jobsService.listaAllInscribed?.forEach(usuario => {
          this.getProfileInscribedUser(usuario);
        });
        
      },
      err => {
        console.log(err);
      }
    );
  }

  getProfileInscribedUser (user: any) {
    this.profilesService.getProfileByUsername(user.username).subscribe(
      res => {
        this.profilesService.profileInscribedUser = res;
        // console.log(this.profilesService.profileInscribedUser);
      },
      err => {
        console.log(err);
      }
    )
  }


  loadDataJobs() {
    window.location.reload();
  }

}

function closeNotificationEditJob(_id: any) {
  var notificationEditJob = document.getElementById("notificationEditJob-" + _id);
  if (notificationEditJob) notificationEditJob.innerHTML = "";
}

function closeNotificationDetailsJob(_id: any) {
  var notificationJobDetails = document.getElementById("notificationJobDetails-" + _id);
  if (notificationJobDetails) notificationJobDetails.innerHTML = "";
}


