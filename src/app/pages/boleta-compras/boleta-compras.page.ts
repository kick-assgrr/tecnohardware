import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-boleta-compras',
  templateUrl: './boleta-compras.page.html',
  styleUrls: ['./boleta-compras.page.scss'],
})
export class BoletaComprasPage implements OnInit {
  productos: any[] = [];
  total: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as { productos: any[], total: number };
      this.productos = state.productos;
      this.total = state.total;
    }
  }
}
