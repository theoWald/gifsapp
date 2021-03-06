import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  //Manera de no usar el gifService en el html
  get historial(){
    return this.gifsService.historial;
  }

  buscar(termino: string){
    return this.gifsService.buscarGifs(termino);
  }

  constructor( private gifsService: GifsService ) {}

}
