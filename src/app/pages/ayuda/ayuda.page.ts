import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage {

  constructor(private router: Router) {}

  enviarCorreo() {
    window.location.href = 'mailto:tecnohw2024@gmail.com';
  }

  contactarWhatsApp() {
    window.open('https://wa.me/+56947457024', '_blank');
  }

  back() {
    this.router.navigateByUrl('menu');
  }
}