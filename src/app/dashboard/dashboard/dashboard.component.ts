import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  estadoMenuDesplegable: string = "none";
  isSticky: boolean = false;
  screenWidth!: number;

  ngOnInit() {
    // Calcula el tamaño de la ventana y aplica el estado del menú desplegable
    this.screenWidth = window.innerWidth;
    if(this.screenWidth > 998){
      this.estadoMenuDesplegable = "block";
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition >= 160) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth > 998){
      this.estadoMenuDesplegable = "block";
    }
  }
  escucharEstadoDesplegarMenu(event: string): void{
    this.estadoMenuDesplegable = event;
    console.log(this.estadoMenuDesplegable)
  }
}
