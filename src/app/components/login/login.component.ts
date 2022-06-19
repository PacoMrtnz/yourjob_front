import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    // localStorage.setItem("authToken", "");
    if (localStorage.getItem("username") && localStorage.getItem("userEmail") 
        && localStorage.getItem("userID") 
        && localStorage.getItem("verified")) {
      location.href = "/";
    }

    // let btnresetPassword = document.getElementById("forgetPassword");
    // btnresetPassword?.addEventListener("click", this.resetPassword);
  }

  authenticateUser(form: NgForm) {
    // console.log(form.value);

    //Validations for Username
    if (form.value.username == "") {
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

    //Validations for Password
    if (form.value.password == "" || form.value.password.length < 6 || form.value.password.includes(" ")) {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errPassword";
      document.getElementById("errPassword")?.remove();
      let inputPassword = document.getElementById("password");
      if (inputPassword) {
        spanError.innerHTML = "Debe tener como mínimo 6 carácteres y no espacios en blanco";
        inputPassword.parentNode?.insertBefore(spanError, null);
        inputPassword.style.borderColor = "red";
      }
    } else {
      let inputPassword = document.getElementById("password");
      if (inputPassword) inputPassword.style.borderColor = "green";
      document.getElementById("errPassword")?.remove();
    }


    // localStorage.setItem("authToken", "");
    this.usersService.authenticateUser(form.value).subscribe(
      res => {
        let response = Object.values(res);
        // console.log(response);
        let token = response[2];
        let message = response[3];
        // console.log(message);
        let verified = response[1].verified;
        // console.log(verified);
        // token.split(" ")[1]

        //Almacena en localStorage el token de authentication
        localStorage.setItem("authToken", token.split(" ")[1]);
        // localStorage.setItem("userID", response[1]._id)
        // localStorage.setItem("username", response[1].username)
        // localStorage.setItem("userEmail", response[1].email)

        // if (!verified) {
        // alert("no esta verificado");
        //     var contenido = `<div id="notificationRegister">
        //     <div class="col-sm-12" style="text-align:left;">
        //     <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
        //         style="cursor: initial;" role="alert" data-brk-library="component__alert">
        //         <div class="row">
        //             <div class="col-md-10 mt-1">
        //                 <i class="start-icon far fa-times-circle faa-pulse animated"></i>
        //                 No ha verificado su cuenta, compruebe su bandeja de correo electrónico
        //             </div>
        //             <div class="col-md-2" style="text-align: right;">
        //                 <button id="btnCloseNotification" (click)="closeNotification(notificationError)" type="button"
        //                     class="btn close font__size-18" data-dismiss="alert" title="Cerrar notificación">
        //                     <span aria-hidden="true">
        //                         <i class="fa fa-times danger"></i>
        //                     </span>
        //                     <span class="sr-only">Close</span>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        //   </div>
        // </div>`;

        // var notification = document.getElementById("notification");
        // while (notification?.firstChild) {
        //   notification.removeChild(notification.firstChild);
        // };
        // var divPrincipal = document.createElement("div");
        // divPrincipal.innerHTML = contenido;
        // divPrincipal.className = "mt-3";
        // notification?.appendChild(divPrincipal);
        // let btnCloseNotification = document.getElementById("btnCloseNotification");
        // btnCloseNotification?.addEventListener("click", this.closeNotification);

        // } else {
        var contenido = `<div id="notificationRegister">
          <div class="col-sm-12" style="float: left;">
              <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                  style="cursor: initial;" role="alert" data-brk-library="component__alert">
                  <div class="row">
                      <div class="col-md-10 mt-1">
                          <i class="start-icon far fa-check-circle faa-tada animated"></i>
                          ${message}
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

        // var notification = document.getElementById("notification");
        // while (notification?.firstChild) {
        //   notification.removeChild(notification.firstChild);
        // };
        // var divPrincipal = document.createElement("div");
        // divPrincipal.innerHTML = contenido;
        // divPrincipal.className = "mt-3";
        // notification?.appendChild(divPrincipal);
        // let btnCloseNotification = document.getElementById("btnCloseNotification");
        // btnCloseNotification?.addEventListener("click", this.closeNotification);

        if (localStorage.getItem("authToken")) this.checkAuthUser();
        // location.href = "/login";
        // this.usersService.obtainauthToken();


        // this.checkAuthUser();
        // this.usersService.checkAuthUser().subscribe(
        //   res => {
        //     // console.log(res);
        //     let response = Object.values(res);
        //     console.log(response[0]);
        //     localStorage.setItem("userID", response[0]._id)
        //     localStorage.setItem("username", response[0].username)
        //     localStorage.setItem("userEmail", response[0].email)
        //     // console.log(response);
        //     // let verified = response[0].verified;
        //     // if(verified) {
        //     //   alert("si");
        //     // }
        //     // console.log(response[0].verified);

        //     //Redirige al aterrizaje
        //     // location.href = "/";
        //   },
        //   err => {
        //     console.log(err);
        //   }
        // );
        // }

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
      },
      err => {
        let response = Object.values(err);
        let objectMsgError = Object.assign({}, response[7]);
        let msgError = JSON.stringify(Object.values(objectMsgError)[1]);

        if (msgError) {
          if (msgError.includes("Nombre de usuario")) {
            let username = document.getElementById("nombreUsuario");
            if (username) username.style.borderColor = "red";
          }

          if (msgError.includes("Contraseña")) {
            let username = document.getElementById("password");
            if (username) username.style.borderColor = "red";
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

  checkAuthUser() {
    this.usersService.checkAuthUser().subscribe(
      res => {
        // console.log(res);
        let response = Object.values(res);
        // console.log(response[0]);

        // let verified = response[0].verified;

        //Almacena en localStorage los datos del usuario autenticado/logeado
        localStorage.setItem("userID", response[0]._id);
        localStorage.setItem("username", response[0].username);
        localStorage.setItem("userEmail", response[0].email);
        localStorage.setItem("verified", response[0].verified);


        setInterval( () => {
          location.href = "/";
        }, 2000);
        
      },
      err => {
        console.log(err);
      }
    );
  }

  

}
