import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Equipo } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  // atributos
  info: InfoPagina = {};
  cargada = false;
  // tslint:disable-next-line:variable-name
  equipo: Equipo[] = [];

  constructor(private http: HttpClient) {
    // console.log('Servicio de infopagina listo');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // leer el archivo JSON
    this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {
    this.cargada = true;
    this.info = resp;
    });
  }

  private cargarEquipo() {
    // leer json WEB
    this.http.get('https://angular-html-5f95d.firebaseio.com/equipo.json').subscribe((resp: Equipo[]) => {
      this.cargada = true;
      this.equipo = resp;
      // console.log(resp);
    });
  }

}
