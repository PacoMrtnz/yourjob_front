import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  profileForm!: UntypedFormGroup;

  constructor(public formBuilder: UntypedFormBuilder, public profilesService: ProfilesService) { }

  ngOnInit(): void {
    if (!localStorage.getItem("username") && !localStorage.getItem("userEmail")
      && !localStorage.getItem("userID")
      && !localStorage.getItem("verified")) {
      location.href = "/login";
    }
    this.profileForm = this.formBuilder.group({
      avatar: File
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.profileForm.patchValue({
      //   avatar: file
      // });
      // this.profileForm.get('avatar')?.updateValueAndValidity();
      this.profileForm?.get("avatar")?.setValue(file);
    }
  }

  createProfile() {
    let file: File;
    file = this.profileForm.get("avatar")?.value;
    // console.log(file);
    const formData = new FormData();
    formData.append("avatar", file);
    // console.log(formData.get("avatar"));
    this.profilesService.createProfile(formData).subscribe(
      res => {
        // console.log(res);
        let msgNotification = Object.values(res);
        // console.log(msgNotification[1]);
        var contenido = ``;
        if (msgNotification[1]) {
          if (msgNotification[1].includes("imagen")) {
            let avatar = document.getElementById("avatar");
            if (avatar) avatar.style.borderColor = "red";
          }
          if (msgNotification[1].includes("existe")) {
            let avatar = document.getElementById("avatar");
            if (avatar) avatar.style.borderColor = "green";
          }
          if (msgNotification[1].includes("imagen") || msgNotification[1].includes("existe")) {
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
          }
          if (msgNotification[1].includes("correctamente")) {
            let avatar = document.getElementById("avatar");
            if (avatar) avatar.style.borderColor = "green";
            contenido = `<div id="notificationRegister">
            <div class="col-sm-12" style="float: left;">
                <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                    style="cursor: initial;" role="alert" data-brk-library="component__alert">
                    <div class="row">
                        <div class="col-md-10 mt-1">
                            <i class="start-icon far fa-check-circle faa-tada animated"></i>
                            ${msgNotification[1]}
                        </div>
                        <div class="col-md-2" style="text-align: right;">
                            <button id="btnCloseNotification" (click)="closeNotification()" type="button"
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

            // let intervalo = setInterval(() => {
              this.closeNotification();
              location.href = "/profile";
              // clearInterval(intervalo);
            // }, 2000);

          }
        }

        let notification = document.getElementById("notification");
        while (notification?.firstChild) {
          notification.removeChild(notification.firstChild);
        };

        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;

        divPrincipal.innerHTML = contenido;
        notification?.appendChild(divPrincipal);

        let btnCloseNotification = document.getElementById("btnCloseNotification");
        btnCloseNotification?.addEventListener("click", this.closeNotification);


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

  closeNotification() {
    var notification = document.getElementById("notification");
    if (notification) notification.innerHTML = "";
  }

}
