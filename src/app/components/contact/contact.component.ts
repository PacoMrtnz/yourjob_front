import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, NgForm } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  profileForm = new UntypedFormGroup({
    nombre: new UntypedFormControl(''),
    apellidos: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    telefono: new UntypedFormControl(''),
    mensaje: new UntypedFormControl('')
  });

  ngOnInit(): void {
  }

  tramitarContacto(): void {
    let formContact = this.profileForm.value;
    var mail = document.createElement("a");
    mail.href = `mailto:yourjob.soporte@gmail.com?subject=Consulta de ${formContact.email}&body=Hola, soy ${formContact.nombre} ${formContact.apellidos},%0D%0A%0D%0AMe gustaría informarme o preguntarles acerca de la siguiente cuestión:%0D%0A${formContact.mensaje}%0D%0A%0D%0AUn saludo%0D%0A${formContact.email}%0D%0A${formContact.telefono}`;
    mail.click();
  }
  //  let nombre = document.getElementById("fname");
  //  console.log(nombre);
  // }



  // //Funcion que tramita los datos introducidos en el formulario, con su respectiva validación y nos redirige a la app por defecto de correo de nuestro ordenador traspasando los datos introducidos a dicha app
  // function tramitarContacto(event){
  //     event.preventDefault();
  //     var nombre = document.getElementById("fname").value;
  //     var apellidos =  document.getElementById("lname").value;
  //     var email = document.getElementById("email").value;
  //     var mensaje = document.getElementById("message").value;
  //     nombreRegex = /^[a-záéíóúÁÉÍÓÚñÑ ,.'-]+$/i;
  //     apellidosRegex = /^[a-záéíóúÁÉÍÓÚñÑ ,.'-]+$/i;
  //     emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  //     //var formulario = document.querySelector("#form");
  //     var enlaceMandarMail = document.querySelector("#enlaceMandarMail");

  //     console.log(enlaceMandarMail);

  //    if(nombreRegex.test(nombre)) {
  //        if(apellidosRegex.test(apellidos)) {
  //            if(emailRegex.test(email)) {
  //                var DatosFormulario = (new DatosForm(nombre,apellidos,email,mensaje));
  //                enlaceMandarMail.setAttribute('href',`mailto:yourjob.soporte@gmail.com?subject=Nombre: ${DatosFormulario['nombre']}, Apellidos: ${DatosFormulario['apellidos']}, Email: ${DatosFormulario['email']}&body=${DatosFormulario['mensaje']}`);
  //                enlaceMandarMail.click();  
  //            } else {
  //                alert("El mail introducido no tiene un formato correcto");
  //            }
  //        } else {
  //            alert("Los apellidos introducidos no tienen un formato válido");
  //        }
  //    } else {
  //        alert("El nombre introducido no tiene un formato válido")
  //    }

  // }

}
