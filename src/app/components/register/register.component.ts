import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public usersService: UsersService) {

  }

  ngOnInit(): void {
    // this.getUsers();
    if (localStorage.getItem("username") && localStorage.getItem("userEmail")
      && localStorage.getItem("userID")
      && localStorage.getItem("verified")) {
      location.href = "/";
    }
  }

  getUsers() {
    this.usersService.getUsers().subscribe(
      res => {
        this.usersService.users = res;
      },
      err => console.log(err)
    );
  }

  createUser(form: NgForm) {
    // if (form.value._id) {
    //   this.usersService.putUser(form.value).subscribe(
    //     res => {
    //       alert("Usuario actualizado con éxito");
    //       this.getUsers();
    //     },
    //     err => console.log(err)
    //   )
    // } else {


    let regexpEmail = /\S+@\S+\.\S+/;

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

    //Validations for Password
    if (form.value.password == "" || form.value.password !== form.value.confirmPassword || form.value.password.length < 6 || form.value.password.includes(" ")) {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errPassword";
      document.getElementById("errPassword")?.remove();
      let inputPassword = document.getElementById("password");
      if (inputPassword) {
        spanError.innerHTML = "Debe tener como mínimo 6 carácteres sin espacios en blanco y deben coincidir";
        if (form.value.password !== form.value.confirmPassword) spanError.innerHTML = "Las contraseñas deben coincidir";
        if (form.value.password.length < 6 || form.value.password.includes(" ")) spanError.innerHTML = "Debe tener como mínimo 6 carácteres y no espacios en blanco";
        inputPassword.parentNode?.insertBefore(spanError, null);
        inputPassword.style.borderColor = "red";
      }
    } else {
      let inputPassword = document.getElementById("password");
      if (inputPassword) inputPassword.style.borderColor = "green";
      document.getElementById("errPassword")?.remove();
    }

    //Validations for ConfirmUsername
    if (form.value.confirmPassword == "" || form.value.confirmPassword !== form.value.password || form.value.confirmPassword.length < 6 || form.value.password.includes(" ")) {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errConfirmPassword";
      document.getElementById("errConfirmPassword")?.remove();
      let inputConfirmPassword = document.getElementById("confirmPassword");
      if (inputConfirmPassword) {
        if (form.value.confirmPassword !== form.value.password) spanError.innerHTML = "Las contraseñas deben coincidir";
        if (form.value.confirmPassword.length < 6) spanError.innerHTML = "Debe tener como mínimo 6 carácteres y no espacios en blanco";
        inputConfirmPassword.parentNode?.insertBefore(spanError, null);
        inputConfirmPassword.style.borderColor = "red";
      }
    } else {
      let inputConfirmPassword = document.getElementById("confirmPassword");
      if (inputConfirmPassword) inputConfirmPassword.style.borderColor = "green";
      document.getElementById("errConfirmPassword")?.remove();
    }

    //Validations for accountType
    if (!form.value.accountType) {
      let spanError = document.createElement("span");
      spanError.style.color = "red";
      spanError.id = "errAccountType";
      document.getElementById("errAccountType")?.remove();
      let inputAccountType = document.getElementById("accountType");
      if (inputAccountType) {
        spanError.innerHTML = "Seleccione un tipo de cuenta";
        inputAccountType.parentNode?.parentNode?.parentNode?.insertBefore(spanError, null);
        let inputsAccountType = document.getElementsByName("accountType");
        inputsAccountType.forEach(element => {
          element.style.borderColor = "red";
        });
      }
    } else {
      let inputsAccountType = document.getElementsByName("accountType");
      // if (inputsAccountType) {
      inputsAccountType.forEach(input => {
        input.style.borderColor = "green";
      });
      // } 
      document.getElementById("errAccountType")?.remove();
    }

    // console.log(form.value.username);
    this.usersService.registerAccount(form.value).subscribe(
      res => {
        let response = Object.values(res);

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

        // this.getUsers();
        form.reset();
      },
      err => {
        console.log(err);
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
    )
    // }
  }

  editUser(user: Users) {
    this.usersService.selectedUser = user;
  }

  closeNotification() {
    var notification = document.getElementById("notification");
    if (notification) notification.innerHTML = "";
  }

}



