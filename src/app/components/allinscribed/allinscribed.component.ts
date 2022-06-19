import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-allinscribed',
  templateUrl: './allinscribed.component.html',
  styleUrls: ['./allinscribed.component.css']
})
export class AllinscribedComponent implements OnInit {

  p3: number = 1;

  constructor(public jobsService: JobsService, public profilesService: ProfilesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!localStorage.getItem("username") && !localStorage.getItem("userEmail")
      && !localStorage.getItem("userID")
      && !localStorage.getItem("verified")) {
      location.href = "/";
    }

  }

  ngAfterViewInit() {
    this.obtenerEmpleoPorRuta(this.router.url.split("/")[2]);
  }




  key3: string = 'updatedAt';
  reverse3: boolean = true;
  sort3(key3: string) {
    this.key3 = key3;
    this.reverse3 = !this.reverse3;
  }


  obtenerEmpleoPorRuta(idJob: any) {
    this.jobsService.getEmpleo(idJob).subscribe(
      res => {
        var response: any = res;
        let empleoPorRuta = response.job;
        if (empleoPorRuta) {
          this.jobsService.getAllInscribedUsers(empleoPorRuta).subscribe(
            res => {
              // console.log(res);
              var response: any;
              response = res;
              this.jobsService.listaAllInscribed = response.usuarios;
              // console.log(this.jobsService.listaAllInscribed);
              this.jobsService.listaAllInscribed?.forEach(usuario => {
                this.getProfileInscribedUser(usuario);
              });

            },
            err => {
              console.log(err);
            }
          );
        }


      },
      err => {
        console.log(err);
      }
    );
  }

  getProfileInscribedUser(user: any) {
    this.profilesService.getProfileByUsername(user.username).subscribe(
      res => {
        this.profilesService.profileInscribedUser = res;
        // console.log(user._id);
        // console.log(this.profilesService.profileInscribedUser.profile.account._id);
        if (user._id === this.profilesService.profileInscribedUser.profile.account._id) {
          let avatar = document.getElementById("imgAvatar-" + user._id) as HTMLImageElement;
          avatar.src = this.profilesService.profileInscribedUser.profile.avatar;
          let github = document.getElementById("github-" + user._id);
          if (github) {
            if (this.profilesService.profileInscribedUser.profile.social.github === "") {
              this.profilesService.profileInscribedUser.profile.social.github = "Vacío";
            }
            github.innerHTML = this.profilesService.profileInscribedUser.profile.social.github;
          }
          let twitter = document.getElementById("twitter-" + user._id);
          if (twitter) {
            if (this.profilesService.profileInscribedUser.profile.social.twitter === "") {
              this.profilesService.profileInscribedUser.profile.social.twitter = "Vacío";
            }
            twitter.innerHTML = this.profilesService.profileInscribedUser.profile.social.twitter;
          }
          let instagram = document.getElementById("instagram-" + user._id);
          if (instagram) {
            if (this.profilesService.profileInscribedUser.profile.social.instagram === "") {
              this.profilesService.profileInscribedUser.profile.social.instagram = "Vacío";
            }
            instagram.innerHTML = this.profilesService.profileInscribedUser.profile.social.instagram;
          }
          let curriculum = document.getElementById("curriculum-" + user._id);
          if (curriculum) {
            // console.log(this.profilesService.profileInscribedUser.profile.curriculum);
            if (this.profilesService.profileInscribedUser.profile.curriculum === "" || this.profilesService.profileInscribedUser.profile.curriculum.includes("undefined")) {
              this.profilesService.profileInscribedUser.profile.curriculum = "No hay";
              curriculum.innerHTML = this.profilesService.profileInscribedUser.profile.curriculum;
            } else {
              let urlCV = this.profilesService.profileInscribedUser.profile.curriculum;
              // console.log(this.profilesService.profileInscribedUser.profile.curriculum);
              curriculum.innerHTML = `<button id="btnDownloadCVInscribedUser-${user._id}" type="button" class="btn text-white bg-dark" title="Descargar currículum">
                                      <i class="fas fa-file-download"></i> Descargar</button>`;
              let btnDownloadCVInscribedUser = document.getElementById("btnDownloadCVInscribedUser-" + user._id);
              if (btnDownloadCVInscribedUser) {
                btnDownloadCVInscribedUser.addEventListener("click", () => {
                  this.downloadCV(urlCV);
                });
              }
            }


          }
        }



      },
      err => {
        console.log(err);
      }
    )
  }


  downloadCV(urlCurriculum: string) {
    window.open(urlCurriculum, '_blank');
  }







}


