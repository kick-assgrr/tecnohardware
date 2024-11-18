import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productosmodel } from 'src/app/models/productos';
import { CartService } from 'src/app/services/cart.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tarjetas-video',
  templateUrl: './tarjetas-video.page.html',
  styleUrls: ['./tarjetas-video.page.scss'],
})
export class TarjetasVideoPage implements OnInit {

  productos: productosmodel[] = [];
  filteredProducts: productosmodel[] = [];
  searchTerm: string = '';

  constructor(private firestoreService: FirestoreService, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.firestoreService.getcollectionChanges<productosmodel>('TarjetasVideo').subscribe(data => {
      if (data) {
        this.productos = data;
        this.filterProducts();
      }
    });
  }

  filterProducts() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.filteredProducts = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.productos];
    }
  }

  add(producto: productosmodel) {
    this.cartService.addToCart(producto);
    console.log("Se agrega el siguiente producto:", producto);
  }

  back() {
    this.router.navigateByUrl('menu');
  }
}
