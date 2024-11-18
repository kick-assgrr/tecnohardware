import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { productosmodel } from '../models/productos';
import { getDoc } from '@angular/fire/firestore';
import { StorageService } from './storage.service';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs'; // Importa Observable aquí
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: productosmodel[] = [];
  private apiUrl = 'http://localhost:1801'; // URL de tu servidor backend

  constructor(
    private firestoreService: FirestoreService,
    private storageService: StorageService,
    private helperService: HelperService,
    private http: HttpClient
  ) {}

  async addToCart(producto: productosmodel) {
    if (producto.cantidad <= 0) {
      this.helperService.showAlert('Producto Agotado', '');
      return;
    }

    const existingProductIndex = this.cartItems.findIndex(item => item.id === producto.id);
    if (existingProductIndex !== -1) {
      this.cartItems[existingProductIndex].cantidad += 1;
    } else {
      this.cartItems.push({ ...producto, cantidad: 1 });
    }

    await this.updateCart(); 
    this.helperService.showAlert('Producto agregado al carrito', '');
  }

  clearCart() {
    this.cartItems = [];
    this.storageService.limpiarCarrito();
  }

  async removeFromCart(index: number) {
    const itemToRemove = this.cartItems[index];

    if (itemToRemove.cantidad > 1) {
      itemToRemove.cantidad--; 
    } else {
      this.cartItems.splice(index, 1);
    }

    await this.updateCart();
  }

  async realizarCompra() {
    const items = this.cartItems.slice();
    for (const producto of items) {
      const productRef = this.firestoreService.getDocumentRef('TarjetasVideo', producto.id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const productData = productSnap.data() as productosmodel;
        const nuevaCantidad = productData.cantidad - producto.cantidad;
        if (nuevaCantidad >= 0) {
          await this.firestoreService.updateProductoCantidad(producto.id, nuevaCantidad);
        }
      }
    }
    this.clearCart();
  }

  async getCartItems() {
    const cartItems = await this.storageService.obtenerCarrito();
    this.cartItems = cartItems;
    return this.cartItems;
  }

  async incrementQuantity(index: number) {
    this.cartItems[index].cantidad += 1;
    await this.updateCart();
  }

  async decrementQuantity(index: number) {
    if (this.cartItems[index].cantidad > 1) {
      this.cartItems[index].cantidad -= 1;
      await this.updateCart();
    }
  }

  async updateCart() {
    await this.storageService.guardarCarrito(this.cartItems);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.valor * item.cantidad, 0);
  }

  createPreference(items: productosmodel[]): Observable<any> {
    const orderData = {
      items: items.map(item => ({
        title: item.nombre,
        unit_price: item.valor,
        quantity: item.cantidad,
        currency_id: 'CLP' // Código de moneda
      }))
    };

    return this.http.post(`${this.apiUrl}/create_preference`, orderData);
  }

}
