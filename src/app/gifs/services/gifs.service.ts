import { Injectable } from '@angular/core';

//Novedad Angular 4.0 que dice que da igual donde esta
//el servicio, ya se puede disponer de el ya que el atr
//providedIn lo eleva a nivel global
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];


  get historial(){
    //con esto rompe la referncia y _var vs var, estan separados
    //y no se pueden pisar el uno al otro
    return [...this._historial];
  }

  buscarGifs( query: string){
    

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      //Con esto lo cogemos los 10 primeros
      this._historial = this._historial.splice(0,10);
    }
    
    console.log(this._historial);
  }
  


}
