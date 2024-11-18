import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productosmodel } from 'src/app/models/productos'; // Asegúrate de importar el modelo correcto
import { CartService } from 'src/app/services/cart.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-procesadores',
  templateUrl: './procesadores.page.html',
  styleUrls: ['./procesadores.page.scss'],
})
export class ProcesadoresPage implements OnInit {

  productos: productosmodel[] = [];
  filteredProducts: productosmodel[] = [];
  searchTerm: string = '';

  constructor(private firestoreService: FirestoreService, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    try {
      this.firestoreService.getcollectionChanges<productosmodel>('Procesadores').subscribe(data => {
        if (data) {
          this.productos = data;
          this.filterProducts();
        }
      });
    } catch (error: any) {
      console.error("Error al cargar productos de procesadores: ", error.message);

      // Manejo de errores usando un objeto de mapeo
      const errorHandlers: { [key: string]: () => void } = {
        'Network error': () => {
          console.log('Mostrar alerta: Error de red. Verifica tu conexión e intenta de nuevo.');
        },
        'default': () => {
          console.log('Mostrar alerta: Ocurrió un error al cargar los productos de procesadores. Intenta de nuevo más tarde.');
        }
      };

      const handler = Object.keys(errorHandlers).find(key => error.message.includes(key)) || 'default';
      errorHandlers[handler]();
    }
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
    console.log("Se agrega el siguiente producto de procesadores:", producto);
  }

  back() {
    this.router.navigateByUrl('menu');
  }
}