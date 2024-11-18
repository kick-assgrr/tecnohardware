import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RoleGuard } from './guard/role.guard';

const redireccionarlogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'stock',
    pathMatch: 'full',
    canActivate: [RoleGuard],
    loadChildren: () => import('./pages/stock/stock.module').then(m => m.StockPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then(m => m.RecoverPasswordPageModule)
  },
  {
    path: 'regist',
    loadChildren: () => import('./pages/regist/regist.module').then(m => m.RegistPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'menu',
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionarlogin },
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'productos',
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionarlogin },
    loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosPageModule)
  },
  {
    path: 'ofertas',
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionarlogin },
    loadChildren: () => import('./pages/ofertas/ofertas.module').then(m => m.OfertasPageModule)
  },
  {
    path: 'ayuda',
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionarlogin },
    loadChildren: () => import('./pages/ayuda/ayuda.module').then(m => m.AyudaPageModule)
  },
  {
    path: 'stock',
    canActivate: [RoleGuard], data: { expectedRole: 'admin' },
    loadChildren: () => import('./pages/stock/stock.module').then(m => m.StockPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'productos/tarjetas-de-video',
    loadChildren: () => import('./pages/tarjetas-video/tarjetas-video.module').then(m => m.TarjetasVideoPageModule)
  },
  {
    path: 'productos/procesadores',
    loadChildren: () => import('./pages/procesadores/procesadores.module').then(m => m.ProcesadoresPageModule)
  },
  {
    path: 'productos/placas-madre',
    loadChildren: () => import('./pages/placas-madre/placas-madre.module').then(m => m.PlacasMadrePageModule)
  },
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./pages/mi-cuenta/mi-cuenta.module').then(m => m.MiCuentaPageModule)
  },
  {
    path: 'billetera',
    loadChildren: () => import('./pages/billetera/billetera.module').then(m => m.BilleteraPageModule)
  },
  {
    path: 'boleta-compras',
    loadChildren: () => import('./pages/boleta-compras/boleta-compras.module').then(m => m.BoletaComprasPageModule)
  },
  {
    path: 'elegir-metodo/:total',
    loadChildren: () => import('./pages/elegir-metodo/elegir-metodo.module').then(m => m.ElegirMetodoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
