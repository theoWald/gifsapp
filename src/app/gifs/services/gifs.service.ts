import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

//Novedad Angular 4.0 que dice que da igual donde esta
//el servicio, ya se puede disponer de el ya que el atr
//providedIn lo eleva a nivel global
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'api_key';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif [] = [];

  get historial(){
    //con esto rompe la referncia y _var vs var, estan separados
    //y no se pueden pisar el uno al otro
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }    

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs( query: string){
    
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      //Con esto lo cogemos los 10 primeros
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    //console.log(this._historial);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10');

    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( (res) => {
        //console.log( res.data );
        this.resultados = res.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }
  


}
