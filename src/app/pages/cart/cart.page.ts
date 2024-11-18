import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { productosmodel } from 'src/app/models/productos';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: productosmodel[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router, private http: HttpClient) {}

  async ngOnInit() {
    try {
      // Cargar los elementos del carrito
      this.cartItems = await this.cartService.getCartItems();
      console.log('Carrito obtenido:', this.cartItems);
  
      // Cargar el carrito en el contexto de la página
      await this.loadCart();
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  }

  async loadCart() {
    try {
      this.cartItems = await this.cartService.getCartItems();
      this.calculateTotal();
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  }

  calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  async clearCart() {
    await this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotal();
  }

  async removeFromCart(index: number) {
    await this.cartService.removeFromCart(index);
    await this.loadCart();
  }

  async incrementQuantity(index: number) {
    await this.cartService.incrementQuantity(index);
    this.calculateTotal();
  }

  async decrementQuantity(index: number) {
    await this.cartService.decrementQuantity(index);
    this.calculateTotal();
  }

  back() {
    this.router.navigateByUrl('/menu');
  }

  async proceedToPayment() {
    try {
      const response = await this.cartService.createPreference(this.cartItems).toPromise();
      window.location.href = response.init_point; // Redirige al usuario a la URL de pago
    } catch (error) {
      console.error('Error al crear preferencia de pago:', error);
    }
  }
  redirectToPayment() {
    this.cartService.createPreference(this.cartItems).subscribe(response => {
      // Redirige al URL de pago retornado por el servidor
      window.location.href = response.init_point;
    }, error => {
      console.error('Error al crear la preferencia:', error);
    });
  }

  crearPreferencia(preferencia: any) {
    this.http.post('http://localhost:1801/create_preference', preferencia)
      .subscribe(
        response => console.log('Preferencia creada', response),
        error => console.error('Error al crear la preferencia', error)
      );
  }

    // Nuevo método para redirigir a Mercado Pago
  redirectToMercadoPago() {
    const url = 'https://link.mercadopago.cl/tecnohw2024';
    window.location.href = url;
  }

}
