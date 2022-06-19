import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { JobsService } from 'src/app/services/jobs.service';
import { ProfilesService } from 'src/app/services/profiles.service';
import { UsersService } from 'src/app/services/users.service';
import { Profile } from "../../models/profiles";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: UntypedFormGroup;

  user = "user";
  admin = "admin";
  company="company";

  // public profile?: {
  //   social: {
  //     website: "",
  //     github: "",
  //     twitter: "",
  //     instagram: ""
  //   },
  //   _id?: "",
  //   account: {
  //     _id: "",
  //     username: "",
  //     email: ""
  //   },
  //   avatar: "",
  //   curriculum: "",
  //   createdAt?: Date,
  //   updatedAt?: Date
  // };

  public profileModel?: Profile;

  updateCVForm!: UntypedFormGroup;

  updateUserForm!: UntypedFormGroup;

  updateAvatarForm!: UntypedFormGroup;

  constructor(public formBuilder: UntypedFormBuilder, public profilesService: ProfilesService, public usersService: UsersService, public jobsService: JobsService) { }

  ngOnInit(): void {
    if (!localStorage.getItem("username") && !localStorage.getItem("userEmail")
      && !localStorage.getItem("userID")
      && !localStorage.getItem("verified")) {
      location.href = "/";
    }
    this.profileForm = this.formBuilder.group({
      avatar: File
    });
    this.updateCVForm = this.formBuilder.group({
      curriculum: File
    });
    this.updateAvatarForm = this.formBuilder.group({
      avatar: File
    });
    this.getProfile();
    this.getDataUser();
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
        // let avatar = document.getElementById("avatar");
        // if(avatar) avatar.src = ""

        this.profilesService.profile = profileData[1];
        this.profilesService.updatedRRSS = profileData[1].social;

        // let _idUser = this.profile?._id?.toString;

        // console.log(_idUser);
        // if(_idUser)
        // this.getDataUser(_idUser.toString());

        // console.log(this.profile);
        // while (profile?.firstChild) {
        //   profile.removeChild(profile.firstChild);
        // };
        // let contenido = `
        // `;

        // var divPrincipal = document.createElement("div");
        // divPrincipal.innerHTML = contenido;

        // divPrincipal.innerHTML = contenido;
        // profile?.appendChild(divPrincipal);

        // let btnEliminarUsuario = document.getElementById("deleteUser");
        // btnEliminarUsuario?.addEventListener("click", this.deleteUser);

        // let btnDownloadCV = document.getElementById("downloadCV");
        // btnDownloadCV?.addEventListener("click", function () {
        //   downloadCV(profileData[1].curriculum);
        // }, false);

        // let btnSendCV = document.getElementById("sendCV");
        // btnSendCV?.addEventListener("click", this.sendCV);

        // if(profileData[1].curriculum.includes("undefined")) {
        //   btnEliminarUsuario?.addEventListener("click", this.deleteUserError);
        // };
      },
      err => {
        console.log(err);
        // localStorage.clear();
        location.href = "/create-profile";
        // let profileDiv = document.getElementById("profileDiv");
        // if (profileDiv) profileDiv.stgetdatayle.display = "none";
        // location.href = "/create-profile";
        // let contenido = ``;
        // var divPrincipal = document.createElement("div");
        // divPrincipal.innerHTML = contenido;

        // divPrincipal.innerHTML = contenido;
        // profile?.appendChild(divPrincipal);
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
        let username =  this.jobsService.auxUserInfo.username;
        let email = this.jobsService.auxUserInfo.email;
        let password  = this.jobsService.auxUserInfo.password;
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


  getInscribedJobs() {
    // console.log(this.jobsService.listaInscribedJobs);
    if(this.jobsService.listaInscribedJobs) {
      this.jobsService.listaInscribedJobs[0].forEach((inscribedJob: any) => {
        // console.log(this.jobsService.jobs);
        if(this.jobsService.jobs) {
          this.jobsService.jobs?.forEach((job) => {
            // console.log(job);
            if(inscribedJob == job._id) {
              
              let spanInscribirse = document.getElementById("inscribirse-"+job._id);
              // console.log(spanInscribirse);
              if(spanInscribirse) spanInscribirse.innerHTML = "Inscrito"
            };
          });
        }
        
      });
    }
    
    // if(this.jobsService.listaInscribedJobs)
    //   return this.jobsService.listaInscribedJobs[0];
  }


  closeNotification() {
    var notification = document.getElementById("notification");
    if (notification) notification.innerHTML = "";
  }

  closeNotificationCV() {
    var notificacionCV = document.getElementById("notificacionCV");
    if (notificacionCV) notificacionCV.innerHTML = "";
  }

  closeNotificationLoadCV() {
    var notificacionLoadCV = document.getElementById("notificacionLoadCV");
    if (notificacionLoadCV) notificacionLoadCV.innerHTML = "";
  }

  closeNotificationUpdateAvatar() {
    var notificationUpdateUser = document.getElementById("notificationUpdateAvatar");
    if (notificationUpdateUser) notificationUpdateUser.innerHTML = "";
  }

  closeNotificationUpdateUser() {
    var notificationUpdateAvatar = document.getElementById("notificationUpdateUser");
    if (notificationUpdateAvatar) notificationUpdateAvatar.innerHTML = "";
  }

  closeNotificationUpdateRRSS() {
    var notificationUpdateRRSS = document.getElementById("notificationUpdateRRSS");
    if (notificationUpdateRRSS) notificationUpdateRRSS.innerHTML = "";
  }

  closeNotificationUpdatePassword() {
    var notificationUpdatePassword = document.getElementById("notificationUpdatePassword");
    if (notificationUpdatePassword) notificationUpdatePassword.innerHTML = "";
  }

  downloadCV(urlCurriculum: string) {
    // console.log(urlCurriculum);
    // console.log(this);
    if (urlCurriculum.includes("undefined")) {
      let contenido = `<div id="notificationRegister">
        <div class="col-sm-12" style="text-align:left;">
        <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
            style="cursor: initial;" role="alert" data-brk-library="component__alert">
            <div class="row">
                <div class="col-md-10 mt-1">
                    <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                    No hay ningún currículum vitae para descargar.
                </div>
                <div class="col-md-2" style="text-align: right;">
                    <button id="btnCloseNotification" type="button"
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


      let notificacionCV = document.getElementById("notificacionCV");
      while (notificacionCV?.firstChild) {
        notificacionCV.removeChild(notificacionCV.firstChild);
      };
      var divPrincipal = document.createElement("div");
      divPrincipal.innerHTML = contenido;
      divPrincipal.className = "mt-3";
      notificacionCV?.appendChild(divPrincipal);

      let btnCloseNotification = document.getElementById("btnCloseNotification");
      btnCloseNotification?.addEventListener("click", this.closeNotificationCV);

      return;
    }
    window.open(urlCurriculum, '_blank');
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateCVForm?.get("curriculum")?.setValue(file);
    }
  }

  loadFile() {
    document.getElementById('loadFile')?.click();
  }

  sendCV() {
    let curriculum: File;
    curriculum = this.updateCVForm.get("curriculum")?.value;
    const formData = new FormData();
    formData.append("curriculum", curriculum);
    this.profilesService.updateCV(formData).subscribe(
      res => {
        // // console.log(res);
        let msgNotification = Object.values(res);
        // console.log(msgNotification);
        // console.log(msgNotification[1]);
        var contenido = ``;
        if (msgNotification[1] != true) {
          if (msgNotification[1].includes("curriculum")) {
            let loadFile = document.getElementById("loadFile");
            if (loadFile) loadFile.style.borderColor = "red";
            contenido = `<div id="notificationRegister">
              <div class="col-sm-12" style="text-align:left;">
                <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                    style="cursor: initial;" role="alert" data-brk-library="component__alert">
                    <div class="row">
                        <div class="col-md-10 mt-1">
                            <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                            ${msgNotification[1]}
                        </div>
                        <div class="col-md-2" style="text-align: right;">
                            <button id="btnCloseNotificationLoadCV" type="button"
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
        }

        if (msgNotification[2] != undefined) {
          // if (msgNotification[2].includes("correctamente")) {
          let loadFile = document.getElementById("loadFile");
          if (loadFile) loadFile.style.borderColor = "green";
          contenido = `<div id="notificationRegister">
              <div class="col-sm-12" style="text-align: left">
                  <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                      style="cursor: initial;" role="alert" data-brk-library="component__alert">
                      <div class="row">
                          <div class="col-md-10 mt-1">
                              <i class="start-icon far fa-check-circle faa-tada animated"></i>
                              ${msgNotification[2]}
                          </div>
                          <div class="col-md-2" style="text-align: right;">
                              <button id="btnCloseNotificationLoadCV" type="button"
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

          let intervalo = setInterval(() => {
            document.getElementById("closeModalCV")?.click();
            this.closeNotificationLoadCV();
            (<HTMLFormElement>document.getElementById("updateCVForm"))?.reset();
            location.href = "/profile";
            clearInterval(intervalo);
          }, 3000);

          // let intervalo = setInterval(() => {
          //   this.closeNotification();
          //   location.href = "/profile";
          //   clearInterval(intervalo);
          // }, 3000);

          // }
        }




        let notificacionLoadCV = document.getElementById("notificacionLoadCV");
        while (notificacionLoadCV?.firstChild) {
          notificacionLoadCV.removeChild(notificacionLoadCV.firstChild);
        };

        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;

        divPrincipal.innerHTML = contenido;
        notificacionLoadCV?.appendChild(divPrincipal);

        let btnCloseNotificationLoadCV = document.getElementById("btnCloseNotificationLoadCV");
        btnCloseNotificationLoadCV?.addEventListener("click", this.closeNotificationLoadCV);
      },
      err => {
        console.log(err);
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
          while (notification?.firstChild) {
            notification.removeChild(notification.firstChild);
          };
          var divPrincipal = document.createElement("div");
          divPrincipal.innerHTML = contenido;
          divPrincipal.className = "mt-3";
          notification?.appendChild(divPrincipal);
          let btnCloseNotification = document.getElementById("btnCloseNotification");
          btnCloseNotification?.addEventListener("click", this.closeNotification);
        }
      }
    );
  }



  updateAvatar() {
    let avatar: File;
    avatar = this.updateCVForm.get("curriculum")?.value;
    const formData = new FormData();
    formData.append("avatar", avatar);
    this.profilesService.updateAvatar(formData).subscribe(
      res => {
        // console.log(res);

        let msgNotification = Object.values(res);
        // console.log(msgNotification);
        // console.log(msgNotification[1]);
        var contenido = ``;
        if (msgNotification[1] != true) {
          if (msgNotification[1].includes("avatar")) {
            let loadAvatar = document.getElementById("loadAvatar");
            if (loadAvatar) loadAvatar.style.borderColor = "red";
            contenido = `<div id="notificationRegister">
              <div class="col-sm-12" style="text-align:left;">
                <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                    style="cursor: initial;" role="alert" data-brk-library="component__alert">
                    <div class="row">
                        <div class="col-md-10 mt-1">
                            <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                            ${msgNotification[1]}
                        </div>
                        <div class="col-md-2" style="text-align: right;">
                            <button id="btnCloseNotificationUpdateAvatar" type="button"
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
        }

        if (msgNotification[2] != undefined) {
          // if (msgNotification[2].includes("correctamente")) {
          let loadAvatar = document.getElementById("loadAvatar");
          if (loadAvatar) loadAvatar.style.borderColor = "green";
          contenido = `<div id="notificationRegister">
              <div class="col-sm-12" style="text-align: left">
                  <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                      style="cursor: initial;" role="alert" data-brk-library="component__alert">
                      <div class="row">
                          <div class="col-md-10 mt-1">
                              <i class="start-icon far fa-check-circle faa-tada animated"></i>
                              ${msgNotification[2]}
                          </div>
                          <div class="col-md-2" style="text-align: right;">
                              <button id="btnCloseNotificationUpdateAvatar" type="button"
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

          let intervalo = setInterval(() => {
            document.getElementById("closeModalUpdateAvatar")?.click();
            this.closeNotificationUpdateAvatar();
            (<HTMLFormElement>document.getElementById("updateAvatarForm"))?.reset();
            location.href = "/profile";
            clearInterval(intervalo);
          }, 3000);

        }

        let notificationUpdateAvatar = document.getElementById("notificationUpdateAvatar");
        while (notificationUpdateAvatar?.firstChild) {
          notificationUpdateAvatar.removeChild(notificationUpdateAvatar.firstChild);
        };

        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;

        divPrincipal.innerHTML = contenido;
        notificationUpdateAvatar?.appendChild(divPrincipal);

        let btnCloseNotificationUpdateAvatar = document.getElementById("btnCloseNotificationUpdateAvatar");
        btnCloseNotificationUpdateAvatar?.addEventListener("click", this.closeNotificationUpdateAvatar);

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
                      ${response[7]}
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

          let notificationUpdateAvatar = document.getElementById("notificationUpdateAvatar");
          while (notificationUpdateAvatar?.firstChild) {
            notificationUpdateAvatar.removeChild(notificationUpdateAvatar.firstChild);
          };
          var divPrincipal = document.createElement("div");
          divPrincipal.innerHTML = contenido;
          divPrincipal.className = "mt-3";
          notificationUpdateAvatar?.appendChild(divPrincipal);
          let btnCloseNotification = document.getElementById("btnCloseNotification");
          btnCloseNotification?.addEventListener("click", this.closeNotificationUpdateAvatar);
        }
      }
    );
  }


  updateUser(updatedUserForm: any) {
    // this.profilesService.updatedUser = updatedUserForm.value;
    // console.log(updatedUserForm.value);
    // console.log(this.profilesService.lastPasswordUser);
    // console.log(updatedUser.value);
    // console.log(this.profilesService.updatedUser);
    // console.log(this.profilesService.profile?.account.username);

    let regexpEmail = /\S+@\S+\.\S+/;

    //Validations for Username
    if (updatedUserForm.value.username == "") {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errUsername";
      document.getElementById("errUsername")?.remove();
      let inputUsername = document.getElementById("nombreUsuario");
      if (inputUsername) {
        spanError.innerHTML = "No puede ser un campo vacío";
        inputUsername.parentNode?.insertBefore(spanError, null);
        inputUsername.style.borderColor = "red";
      }
    } else {
      let inputUsername = document.getElementById("nombreUsuario");
      if (inputUsername) inputUsername.style.borderColor = "green";
      document.getElementById("errUsername")?.remove();
    }

    //Validations for Email
    if (updatedUserForm.value.email == "" || !regexpEmail.test(updatedUserForm.value.email)) {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errEmail";
      document.getElementById("errEmail")?.remove();
      let inputEmail = document.getElementById("email");
      if (inputEmail) {
        spanError.innerHTML = "Debe tener un formato correcto (ejemplo@gmail.com)";
        inputEmail.parentNode?.insertBefore(spanError, null);
        inputEmail.style.borderColor = "red";
      }
    } else {
      let inputEmail = document.getElementById("email");
      if (inputEmail) inputEmail.style.borderColor = "green";
      document.getElementById("errEmail")?.remove();
    }

    //Validations for accountType
    if (!updatedUserForm.value.accountType) {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errAccountType";
      document.getElementById("errAccountType")?.remove();
      let inputsAccountType = document.getElementsByName("accountType");
      spanError.innerHTML = "Seleccione un tipo de cuenta";
      inputsAccountType[0].parentNode?.parentNode?.parentNode?.insertBefore(spanError, null);
      inputsAccountType.forEach(input => {
        input.style.borderColor = "red";
      });
      // let inputAccountType = document.getElementById("accountType");
      // if (inputAccountType) {
      //   spanError.innerHTML = "Seleccione un tipo de cuenta";
      //   inputAccountType.parentNode?.parentNode?.parentNode?.insertBefore(spanError, null);
      //   let inputsAccountType = document.getElementsByName("accountType");
      //   inputsAccountType.forEach(element => {
      //     element.style.borderColor = "red";
      //   });
      // }
    } else {
      let inputsAccountType = document.getElementsByName("accountType");
      // if (inputsAccountType) {
      inputsAccountType.forEach(input => {
        input.style.borderColor = "green";
      });
      // } 
      document.getElementById("errAccountType")?.remove();
    }


    this.usersService.putUser(updatedUserForm.value).subscribe(
      res => {
        // console.log(updatedUserForm.value);
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
                          <button id="btnCloseNotificationUpdateUser" (click)="closeNotification(notificationRegister)" type="button"
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

        let notificationUpdateUser = document.getElementById("notificationUpdateUser");
        while (notificationUpdateUser?.firstChild) {
          notificationUpdateUser.removeChild(notificationUpdateUser.firstChild);
        };
        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;
        divPrincipal.className = "mt-3";
        notificationUpdateUser?.appendChild(divPrincipal);
        let btnCloseNotificationUpdateUser = document.getElementById("btnCloseNotificationUpdateUser");
        btnCloseNotificationUpdateUser?.addEventListener("click", this.closeNotificationUpdateUser);

        let username = document.getElementById("nombreUsuario");
        if (username) username.style.borderColor = "green";
        let email = document.getElementById("email");
        if (email) email.style.borderColor = "green";
        let password = document.getElementById("password");
        let confirmPassword = document.getElementById("confirmPassword");
        if (password) password.style.borderColor = "green";
        if (confirmPassword) confirmPassword.style.borderColor = "green";
        let accountType = document.getElementsByName("accountType");
        if (accountType) {
          accountType.forEach(element => {
            element.style.borderColor = "green";
          });
        }

        localStorage.setItem("userID", updatedUserForm.value._id);
        localStorage.setItem("username", updatedUserForm.value.username);
        localStorage.setItem("userEmail", updatedUserForm.value.email);
        // localStorage.setItem("verified", updatedUserForm.value.verificado);

        // this.getUsers();
        updatedUserForm.reset();

        let intervalo = setInterval(() => {
          document.getElementById("closeModalUpdateUser")?.click();
          this.closeNotificationUpdateUser();
          updatedUserForm.reset();
          location.href = "/profile";
          clearInterval(intervalo);
        }, 3000);
      },
      err => {
        // console.log(err);

        let response = Object.values(err);
        let objectMsgError = Object.assign({}, response[7]);
        let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

        var notification = document.getElementById("notification");
        while (notification?.firstChild) {
          notification.removeChild(notification.firstChild);
        };

        if (msgError != undefined) {
          if (msgError.includes("nombre de usuario")) {
            let username = document.getElementById("nombreUsuario");
            if (username) username.style.borderColor = "red";
          }
          if (msgError.includes("email")) {
            let email = document.getElementById("email");
            if (email) email.style.borderColor = "red";
          }
          if (msgError.includes("tipo de cuenta")) {
            let accountType = document.getElementsByName("accountType");
            if (accountType) {
              accountType.forEach(element => {
                element.style.borderColor = "red";
              });
            }
          }

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
                      <button id="btnCloseNotificationUpdateUser" (click)="closeNotification(notificationError)" type="button"
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

          let notificationUpdateUser = document.getElementById("notificationUpdateUser");
          while (notificationUpdateUser?.firstChild) {
            notificationUpdateUser.removeChild(notificationUpdateUser.firstChild);
          };
          var divPrincipal = document.createElement("div");
          divPrincipal.innerHTML = contenido;
          divPrincipal.className = "mt-3";
          notificationUpdateUser?.appendChild(divPrincipal);
          let btnCloseNotificationUpdateUser = document.getElementById("btnCloseNotificationUpdateUser");
          btnCloseNotificationUpdateUser?.addEventListener("click", this.closeNotificationUpdateUser);
        }
      }
    );

    this.jobsService.getJobsByUsername(this.profilesService.profile?.account.username).subscribe(
      res => { 
        var response: any = res;
        this.jobsService.listaJobsGetByUsername = response.jobs;
        if(this.jobsService.listaJobsGetByUsername) {
          this.jobsService.listaJobsGetByUsername.forEach(job => {
              job.author = updatedUserForm.value.username;
            this.jobsService.editarEmpleo(job).subscribe(
              res=> {
                // console.log(res);
              },
              err => {
                console.log(err);
              }
            )
          });
        }        
      },
      err => {
        console.log(err);
      }
    );

    

    
  }


  updateRRSS(updatedRRSSForm: any) {
    if (this.profilesService.profile) this.profilesService.profile.social = updatedRRSSForm.value;
    this.profilesService.updatedRRSS = updatedRRSSForm.value;

    this.profilesService.updateRRSS(updatedRRSSForm.value).subscribe(
      res => {
        // console.log(res);
        let response = Object.values(res);

        let notificationUpdateRRSS = document.getElementById("notificationUpdateRRSS");
        while (notificationUpdateRRSS?.firstChild) {
          notificationUpdateRRSS.removeChild(notificationUpdateRRSS.firstChild);
        };

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
                          <button id="btnCloseNotificationUpdateRRSS" (click)="closeNotification(notificationRegister)" type="button"
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

        notificationUpdateRRSS = document.getElementById("notificationUpdateRRSS");
        while (notificationUpdateRRSS?.firstChild) {
          notificationUpdateRRSS.removeChild(notificationUpdateRRSS.firstChild);
        };
        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;
        divPrincipal.className = "mt-3";
        notificationUpdateRRSS?.appendChild(divPrincipal);
        let btnCloseNotificationUpdateRRSS = document.getElementById("btnCloseNotificationUpdateRRSS");
        btnCloseNotificationUpdateRRSS?.addEventListener("click", this.closeNotificationUpdateRRSS);


        let intervalo = setInterval(() => {
          document.getElementById("closeModalUpdateRRSS")?.click();
          this.closeNotificationUpdateRRSS();
          updatedRRSSForm.reset();
          location.href = "/profile";
          clearInterval(intervalo);
        }, 3000);

      },
      err => {
        console.log(err);

        let response = Object.values(err);
        let objectMsgError = Object.assign({}, response[7]);
        let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

        var notificationUpdateRRSS = document.getElementById("notificationUpdateRRSS");
        while (notificationUpdateRRSS?.firstChild) {
          notificationUpdateRRSS.removeChild(notificationUpdateRRSS.firstChild);
        };

        if (msgError != undefined) {
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
                      <button id="btnCloseNotificationUpdateRRSS" (click)="closeNotification(notificationError)" type="button"
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

          let notificationUpdateRRSS = document.getElementById("notificationUpdateRRSS");
          while (notificationUpdateRRSS?.firstChild) {
            notificationUpdateRRSS.removeChild(notificationUpdateRRSS.firstChild);
          };
          var divPrincipal = document.createElement("div");
          divPrincipal.innerHTML = contenido;
          divPrincipal.className = "mt-3";
          notificationUpdateRRSS?.appendChild(divPrincipal);
          let btnCloseNotificationUpdateRRSS = document.getElementById("btnCloseNotificationUpdateRRSS");
          btnCloseNotificationUpdateRRSS?.addEventListener("click", this.closeNotificationUpdateRRSS);
        }
      }
    );
  }


  updatePassword(updatedPasswordForm: any) {
    // console.log(updatedPasswordForm.value);

    this.profilesService.updatedPassword = updatedPasswordForm.value;

    this.usersService.putPasswordUser(updatedPasswordForm.value).subscribe(
      res => {
        // console.log(res);

        // this.getDataUser();

        let response = Object.values(res);

        let notificationUpdatePassword = document.getElementById("notificationUpdatePassword");
        while (notificationUpdatePassword?.firstChild) {
          notificationUpdatePassword.removeChild(notificationUpdatePassword.firstChild);
        };

        var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="text-align: left;">
              <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  style="cursor: initial;" role="alert" data-brk-library="component__alert">
                  <div class="row">
                      <div class="col-md-10 mt-1 text-left">
                          <i class="start-icon far fa-check-circle faa-tada animated"></i>
                          ${response[1]}
                      </div>
                      <div class="col-md-2" style="text-align: right;">
                          <button id="btnCloseNotificationUpdateRRSS" (click)="closeNotification(notificationRegister)" type="button"
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

        notificationUpdatePassword = document.getElementById("notificationUpdatePassword");
        while (notificationUpdatePassword?.firstChild) {
          notificationUpdatePassword.removeChild(notificationUpdatePassword.firstChild);
        };
        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;
        divPrincipal.className = "mt-3";
        notificationUpdatePassword?.appendChild(divPrincipal);
        let btnCloseNotificationUpdatePassword = document.getElementById("btnCloseNotificationUpdatePassword");
        btnCloseNotificationUpdatePassword?.addEventListener("click", this.closeNotificationUpdatePassword);


        let intervalo = setInterval(() => {
          document.getElementById("closeModalUpdatePassword")?.click();
          this.closeNotificationUpdatePassword();
          this.getDataUser();
          updatedPasswordForm.reset();
          location.href = "/profile";
          clearInterval(intervalo);
        }, 3000);

      },
      err => {
        let response = Object.values(err);
        let objectMsgError = Object.assign({}, response[7]);
        let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

        var notificationUpdatePassword = document.getElementById("notificationUpdatePassword");
        while (notificationUpdatePassword?.firstChild) {
          notificationUpdatePassword.removeChild(notificationUpdatePassword.firstChild);
        };

        if (msgError != undefined) {
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
                      <button id="btnCloseNotificationUpdatePassword" (click)="closeNotification(notificationError)" type="button"
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

          let notificationUpdatePassword = document.getElementById("notificationUpdatePassword");
          while (notificationUpdatePassword?.firstChild) {
            notificationUpdatePassword.removeChild(notificationUpdatePassword.firstChild);
          };
          var divPrincipal = document.createElement("div");
          divPrincipal.innerHTML = contenido;
          divPrincipal.className = "mt-3";
          notificationUpdatePassword?.appendChild(divPrincipal);
          let btnCloseNotificationUpdatePassword = document.getElementById("btnCloseNotificationUpdatePassword");
          btnCloseNotificationUpdatePassword?.addEventListener("click", this.closeNotificationUpdatePassword);
        }
      });

  }


  deleteUser() {
    if (confirm("La opción será irreversible. ¿Quiere eliminar el usuario para siempre?")) {

      let userID = localStorage.getItem("userID");
      // console.log(userID);

      this.profilesService.deleteProfile(userID).subscribe(
        res => {
          // console.log(res);

          let response = Object.values(res);

          let notification = document.getElementById("notification");
          while (notification?.firstChild) {
            notification.removeChild(notification.firstChild);
          };

          var contenido = `<div id="notificationRegister">
                <div class="col-sm-12" style="text-align: left;">
                    <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                        style="cursor: initial;" role="alert" data-brk-library="component__alert">
                        <div class="row">
                            <div class="col-md-10 mt-1 text-left">
                                <i class="start-icon far fa-check-circle faa-tada animated"></i>
                                ${response[1]}
                            </div>
                            <div class="col-md-2" style="text-align: right;">
                                <button id="btnCloseNotificationDeleteUser" (click)="closeNotification(notificationRegister)" type="button"
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

          notification = document.getElementById("notification");
          while (notification?.firstChild) {
            notification.removeChild(notification.firstChild);
          };
          var divPrincipal = document.createElement("div");
          divPrincipal.innerHTML = contenido;
          divPrincipal.className = "mt-3";
          notification?.appendChild(divPrincipal);
          let btnCloseNotificationDeleteUser = document.getElementById("btnCloseNotificationDeleteUser");
          btnCloseNotificationDeleteUser?.addEventListener("click", this.closeNotification);

          if (response[1].includes("Perfil eliminado")) {
            this.usersService.deleteUser(userID).subscribe(
              res => {
                // console.log(res);

                let response = Object.values(res);

                let notification = document.getElementById("notification");
                while (notification?.firstChild) {
                  notification.removeChild(notification.firstChild);
                };

                var contenido = `<div id="notificationRegister">
                  <div class="col-sm-12" style="text-align: left;">
                      <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                          style="cursor: initial;" role="alert" data-brk-library="component__alert">
                          <div class="row">
                              <div class="col-md-10 mt-1 text-left">
                                  <i class="start-icon far fa-check-circle faa-tada animated"></i>
                                  ${response[1]}
                              </div>
                              <div class="col-md-2" style="text-align: right;">
                                  <button id="btnCloseNotificationDeleteUser" (click)="closeNotification(notificationRegister)" type="button"
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

                notification = document.getElementById("notification");
                while (notification?.firstChild) {
                  notification.removeChild(notification.firstChild);
                };
                var divPrincipal = document.createElement("div");
                divPrincipal.innerHTML = contenido;
                divPrincipal.className = "mt-3";
                notification?.appendChild(divPrincipal);
                let btnCloseNotificationDeleteUser = document.getElementById("btnCloseNotificationDeleteUser");
                btnCloseNotificationDeleteUser?.addEventListener("click", this.closeNotification);


                let intervalo = setInterval(() => {
                  this.closeNotification();
                  location.href = "/profile";
                  localStorage.clear();
                  location.href = "/register";
                  clearInterval(intervalo);
                }, 3000);

              },
              err => {
                // console.log(err);

                let response = Object.values(err);
                let objectMsgError = Object.assign({}, response[7]);
                let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

                var notification = document.getElementById("notification");
                while (notification?.firstChild) {
                  notification.removeChild(notification.firstChild);
                };

                if (msgError != undefined) {
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
                            <button id="btnCloseNotificationDeleteUser" (click)="closeNotification(notificationError)" type="button"
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
                  while (notification?.firstChild) {
                    notification.removeChild(notification.firstChild);
                  };
                  var divPrincipal = document.createElement("div");
                  divPrincipal.innerHTML = contenido;
                  divPrincipal.className = "mt-3";
                  notification?.appendChild(divPrincipal);
                  let btnCloseNotificationDeleteUser = document.getElementById("btnCloseNotificationDeleteUser");
                  btnCloseNotificationDeleteUser?.addEventListener("click", this.closeNotification);
                }
              }
            );

          }


        },
        err => {
          // console.log(err);
          let response = Object.values(err);
          let objectMsgError = Object.assign({}, response[7]);
          let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

          var notification = document.getElementById("notification");
          while (notification?.firstChild) {
            notification.removeChild(notification.firstChild);
          };

          if (msgError != undefined) {
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
                          <button id="btnCloseNotificationDeleteUser" (click)="closeNotification(notificationError)" type="button"
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
            while (notification?.firstChild) {
              notification.removeChild(notification.firstChild);
            };
            var divPrincipal = document.createElement("div");
            divPrincipal.innerHTML = contenido;
            divPrincipal.className = "mt-3";
            notification?.appendChild(divPrincipal);
            let btnCloseNotificationDeleteUser = document.getElementById("btnCloseNotificationDeleteUser");
            btnCloseNotificationDeleteUser?.addEventListener("click", this.closeNotification);
          }

        }
      );

    }
  }

  loadData() {
    window.location.reload();
  }




}

