import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsComponent } from '../../components/jobs/jobs.component';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  providers: [JobsComponent, NavbarComponent],
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {

  listaCategorias: any[] = ["Administración de Empresas", "Administrativos y secretariado", "Atención al cliente", "Banca, finanzas y seguros", "I+D, PRL y medio ambiente", "Comercial, ventas", "Compras, logística y transporte", "Construcción e inmobiliaria", "Digital", "Educación, formación", "Hostelería, Turismo", "Ingeniería y producción", "Legal", "Marketing, publicidad y RRPP", "Medios, editorial y artes gráficas", "Personal de tienda y retail", "Profesionales, artes y oficios", "Recursos humanos", "Sanidad, salud y servicios sociales", "Tecnología e informática", "Telecomunicaciones"];

  constructor(public navbarComponent: NavbarComponent, private jobsComponent: JobsComponent, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage.getItem("username") && localStorage.getItem("userEmail")
      && localStorage.getItem("userID")
      && localStorage.getItem("verified")) {

      var contenido = `<li class="nav-item dropdown" style="list-style: none;">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
          data-bs-toggle="dropdown" aria-expanded="false">
          <span class="col-md-1 col-md-offset-2 text-center" title="Desplegar Opciones de Usuario"><i
              class="fas fa-user"></i> 
              ${localStorage.getItem("username")}    
          </span>
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="/profile" title="Ir a Mi perfil">Mi perfil</a></li>
          <li>
              <hr class="dropdown-divider">
          </li>
          <li><a id="cerrarSesion2" class="dropdown-item" title="Cerrar sesión de usuario" style="cursor:pointer;"><span>Cerrar sesión <i class="fas fa-power-off" style="color:red;"></i>
          </span></a></li>
      </ul>
  </li>`;


      let divUsuario = document.getElementById("usuario2");
      while (divUsuario?.firstChild) {
        divUsuario.removeChild(divUsuario.firstChild);
      };
      var divPrincipal = document.createElement("div");
      divPrincipal.innerHTML = contenido;
      // divPrincipal.className = "mt-3";
      divUsuario?.appendChild(divPrincipal);
      let btnCerrarSesion = document.getElementById("cerrarSesion2");
      btnCerrarSesion?.addEventListener("click", this.navbarComponent.cerrarSesion);
    }
  }

  filtrarXCategNavbar(categ: any) {
    this.jobsComponent.filtrarXCategoria(categ.target.value);
    this.router.navigate(['/jobs']);
  }

}
