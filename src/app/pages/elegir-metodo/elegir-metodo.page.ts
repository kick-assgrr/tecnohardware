import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { AlertController, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CartService } from '../../services/cart.service'; // Importar el servicio CartService

@Component({
  selector: 'app-elegir-metodo',
  templateUrl: './elegir-metodo.page.html',
  styleUrls: ['./elegir-metodo.page.scss'],
})
export class ElegirMetodoPage {
  metodosPago: any[] = [];
  userId: string = '';
  nuevoMetodo: any = {
    tipo: '',
    numero: '',
    nombre: '',
    fechaVencimiento: '',
    cvv: '',
    guardar: 'no'
  };
  cartItems: any[] = [];
  total: number = 0;
  metodoSeleccionado: any = null;

  constructor(
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router,
    private cartService: CartService, // Inyectar el servicio CartService
    private navController: NavController
  ) {
    this.nuevoMetodo.guardar = 'si';
  }

  async ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.loadPaymentMethods();
      }
    });
    this.cartItems = await this.cartService.getCartItems();
    this.total = this.cartItems.reduce((sum, item) => sum + (item.valor * item.cantidad), 0);
  }

  loadPaymentMethods() {
    this.firestoreService.getPaymentMethods(this.userId).subscribe(data => {
      this.metodosPago = data.map(e => ({ id: e.id, ...e }));
    });
  }

  async agregarMetodoPago() {
    if (this.nuevoMetodo.guardar === 'si') {
      this.nuevoMetodo.tipo = this.detectarTipoTarjeta(this.nuevoMetodo.numero);
      await this.firestoreService.addPaymentMethod(this.userId, this.nuevoMetodo);
      this.loadPaymentMethods();
    }
    this.nuevoMetodo = {
      tipo: '',
      numero: '',
      nombre: '',
      fechaVencimiento: '',
      cvv: '',
      guardar: 'no'
    };
  }

  async eliminarMetodoPago(metodo: any) {
    await this.firestoreService.deletePaymentMethod(this.userId, metodo.id);
    this.loadPaymentMethods();
  }

  async editarMetodoPago(metodo: any) {
    const { id, tipo, numero, nombre, fechaVencimiento, cvv } = metodo;
    const alert = await this.alertController.create({
      header: 'Editar Método de Pago',
      inputs: [
        { name: 'tipo', type: 'text', placeholder: 'Tipo de tarjeta', value: tipo },
        { name: 'numero', type: 'text', placeholder: 'Número de tarjeta', value: numero },
        { name: 'nombre', type: 'text', placeholder: 'Nombre del titular', value: nombre },
        { name: 'fechaVencimiento', type: 'text', placeholder: 'Fecha de vencimiento (MM/AA)', value: fechaVencimiento },
        { name: 'cvv', type: 'text', placeholder: 'CVV', value: cvv }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data: any) => {
            await this.firestoreService.updatePaymentMethod(this.userId, id, {
              tipo: data.tipo,
              numero: data.numero,
              nombre: data.nombre,
              fechaVencimiento: data.fechaVencimiento,
              cvv: data.cvv
            });
            this.loadPaymentMethods();
          }
        }
      ]
    });

    await alert.present();
  }

  detectarTipoTarjeta(numeroTarjeta: string): string {
    if (/^4/.test(numeroTarjeta)) {
      return 'Visa';
    } else if (/^5[1-5]/.test(numeroTarjeta)) {
      return 'Mastercard';
    } else {
      return 'Desconocido';
    }
  }

  mostrarTipoTarjeta(tipo: string): string {
    return (tipo === 'Visa' || tipo === 'Mastercard') ? tipo : 'Otro';
  }

  finalizarCompra() {
    if (this.cartItems.length === 0) {
      this.presentAlert('Carrito Vacío', 'No hay productos en el carrito.');
      return;
    }
  
    if (!this.metodoSeleccionado) {
      if (this.metodosPago.length === 0) {
        this.presentAlert('No hay métodos de pago', 'Debe añadir al menos una tarjeta para continuar.');
        return;
      } else if (this.metodosPago.length === 1) {
        this.metodoSeleccionado = this.metodosPago[0];
      } else {
        this.presentAlert('Seleccione tarjeta', 'Debe seleccionar una tarjeta para continuar.');
        return;
      }
    }
  
    // método de pago seleccionado
    this.cartService.realizarCompra().then(() => {
      const navigationExtras: NavigationExtras = {
        state: {
          productos: this.cartItems,
          total: this.total,
          metodoPago: this.metodoSeleccionado
        }
      };
      this.router.navigate(['/boleta-compras'], navigationExtras);
    }).catch(error => {
      console.error('Error al realizar la compra:', error);
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
