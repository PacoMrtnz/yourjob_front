import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
  }

  resetPassword(form: NgForm) { 
    let regexpEmail = /\S+@\S+\.\S+/;
    //Validations for Email
    if (form.value.email == "" || !regexpEmail.test(form.value.email)) {
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

    this.usersService.resetPasswordProcess(form.value).subscribe(
      res => {
        let response = Object.values(res);
        // console.log(response[1]);
        var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="float: left;">
              <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  style="cursor: initial;" role="alert" data-brk-library="component__alert">
                  <div class="row">
                      <div class="col-md-10 mt-1">
                          <i class="start-icon far fa-check-circle faa-tada animated"></i>
                          ${response[1]}
                      </div>
                      <div class="col-md-2" style="text-align: right;">
                          <button id="btnCloseNotification" (click)="closeNotification(notificationRegister)" type="button"
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

        var notification = document.getElementById("notification");
        while (notification?.firstChild) {
          notification.removeChild(notification.firstChild);
        };
        var divPrincipal = document.createElement("div");
        divPrincipal.innerHTML = contenido;
        divPrincipal.className = "mt-3";
        notification?.appendChild(divPrincipal);
    
        let btnCloseNotification = document.getElementById("btnCloseNotification");
        btnCloseNotification?.addEventListener("click", this.closeNotification);

        let email = document.getElementById("email");
        if (email) email.style.borderColor = "green";

        form.reset();
      },
      err => {
        let response = Object.values(err);
        let objectMsgError = Object.assign({}, response[7]);
        let msgError = JSON.stringify(Object.values(objectMsgError)[1]);
        // console.log(msgError);

        var notification = document.getElementById("notification");
          while (notification?.firstChild) {
            notification.removeChild(notification.firstChild);
          };
        if(msgError != undefined) {
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
                      <button id="btnCloseNotification" (click)="closeNotification(notificationError)" type="button"
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
