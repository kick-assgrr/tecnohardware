import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = await this.auth.currentUser;

    if (!user) {
      const isAdminStored = localStorage.getItem('isAdmin');
      if (isAdminStored === 'true') {
        return true;
      } else {
        this.presentAlert('Error', 'No tienes los permisos para ingresar.');
        this.router.navigate(['/menu']);
        return false;
      }
    }
    
    // aqui definimos el correo que será el del administrador
    const adminEmail = 'tecnohw2024@gmail.com';
    
    if (user.email === adminEmail) {
      localStorage.setItem('isAdmin', 'true');
      return true;
    } else {
      localStorage.removeItem('isAdmin');
      // se va a redirigir a página principal para los que no son administradores
      this.presentAlert('Acceso denegado', 'No tienes permiso para acceder a esta página.');
      this.router.navigate(['/menu']);
      return false;
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
} 
