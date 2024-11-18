import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  showSubMenu: string = '';
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private helper: HelperService,
    private auth:AngularFireAuth
  ) {}

  async logout() {
    var confirmar = await this.helper.showConfirm(
      '¿Desea cerrar la sesión actual?',
      'Confirmar',
      'Cancelar'
    );
    if (confirmar) {
      this.router.navigateByUrl('login');
    }
  }

  toggleSubMenu(subMenu: string) {
    if (this.showSubMenu === subMenu) {
      this.showSubMenu = ''; 
    } else {
      this.showSubMenu = subMenu; 
    }
  }

  verCategoria(categoria: string) {
    switch (categoria) {
      case 'Tarjetas de video':
        this.router.navigateByUrl('productos/tarjetas-de-video');
        break;
      case 'Procesadores':
        this.router.navigateByUrl('productos/procesadores');
        break;
      case 'Placas madre':
        this.router.navigateByUrl('productos/placas-madre');
        break;
      default:
        break;
    }
  }

  perfil() {
    this.router.navigateByUrl('/mi-cuenta');
  }

    billetera() {
    this.router.navigate(['/billetera']);
  }

  productos() {
    this.router.navigateByUrl('productos');
  }

  ofertas() {
    this.router.navigateByUrl('ofertas');
  }

  ayuda() {
    this.router.navigateByUrl('ayuda');
  }


  openCart() {
    this.router.navigateByUrl('carrito-compras');
  }

  swiperSlideChanged(e: any) {
    console.log('Change: ', e);
  }

  async ngOnInit() {
    await this.checkAdminStatus();
  }

  async checkAdminStatus() {
    try {
      const currentUser = await this.auth.currentUser;
      if (currentUser) {
        this.isAdmin = await this.isAdminUser(currentUser);
      } else {
        this.isAdmin = false;
      }
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      this.isAdmin = false;
    }
  }

  async isAdminUser(user: firebase.User | null): Promise<boolean> {
    const adminEmail = 'tecnohw2024@gmail.com';
    try {
      return user !== null && user.email === adminEmail;
    } catch (error) {
      console.error('Error al verificar el estado de administrador:', error);
      return false;
    }
  }

  stock() {
    this.router.navigateByUrl('/stock');
  }
}
