import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service'; // Asegúrate de importar el servicio FirestoreService
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth si necesitas obtener el userId

@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.page.html',
  styleUrls: ['./billetera.page.scss'],
})
export class BilleteraPage implements OnInit {
  tarjetas: any[] = [];
  userId: string = '';

  constructor(
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private auth: AngularFireAuth 
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid; 
        this.loadTarjetas();
      }
    });
  }

  async loadTarjetas() {
    this.firestoreService.getPaymentMethods(this.userId).subscribe((data: any[]) => {
      this.tarjetas = data;
    });
  }
  async eliminarTarjeta(tarjeta: any) {
    await this.firestoreService.deletePaymentMethod(this.userId, tarjeta.id);
    this.loadTarjetas();
  }


  mostrarTipoTarjeta(tipo: string): string {
    return (tipo === 'Visa' || tipo === 'Mastercard') ? tipo : 'Otro';
  }

  async editarTarjeta(tarjeta: any) {
    console.log('Editar tarjeta:', tarjeta);
  }
}
