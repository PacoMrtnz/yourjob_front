import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gotop',
  templateUrl: './gotop.component.html',
  styleUrls: ['./gotop.component.css']
})
export class GotopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Cuando el usuario hace scroll hacia abajo 20px desde desde el inicio de la página, se muestra el botón
    window.onscroll = function () {
      scrollFunction();
    };

    let mybutton = document.getElementById("btn-back-to-top");

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        if (mybutton) mybutton.style.display = "block";
      } else {
        if (mybutton) mybutton.style.display = "none";
      }
    }
    // Cuando el usuario hace clic al botón, se hace scroll hacia arriba de la página
    if (mybutton) mybutton.addEventListener("click", backToTop);

    function backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }



  }







}
