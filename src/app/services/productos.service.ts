import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();

  }

  private cargarProductos() {
    return new Promise( (resolve, reject ) => {
      this.http.get('https://angular-html-5f95d.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          console.log(resp);
          this.productos = resp;
          setTimeout(() => {
            this.cargando = false;
          }, 1000);
          resolve();
        });
    });
  }

  public getProducto(id: string) {
    return this.http.get(`https://angular-html-5f95d.firebaseio.com/productos/${id}.json`);
  }

  public buscarProducto(termino: string) {
    if (this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // aplicar los filtros
        this.filtrarProductos( termino );
      });
    } else {
      //
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string) {
    // this.productosFiltrado = this.productos.filter(producto => {
    //  return true;
    // });

    termino = termino.toLocaleLowerCase();

    this.productosFiltrado = [];
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      const categoriaLower = prod.categoria.toLocaleLowerCase();
      if (categoriaLower.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ) {
        this.productosFiltrado.push(prod);
      }
    });
    console.log(this.productosFiltrado);
  }
}
