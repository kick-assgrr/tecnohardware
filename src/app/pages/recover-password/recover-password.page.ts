import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})

export class RecoverPasswordPage implements OnInit {
  changepass: string = '';
  mostrarMensaje: boolean = false;
  mensaje: string = "";

  email: string = '';

  usuario:any;

  constructor(private router:Router,private helper:HelperService, private auth:AngularFireAuth,private storage:StorageService) { }
  

  cerrarMensaje() {
    this.mostrarMensaje = false;
    this.mensaje = '';
    this.changepass = '';
    this.usuario = '';
  }


  ngOnInit() {
  }


  back() {
    this.router.navigateByUrl("login")
  }

   async changePassword() {
    const loader = await this.helper.showLoader("Enviando correo de recuperación");
    const usuario = (await this.storage.obtenerUsuario()).filter(u => u.email == this.changepass);
    if (usuario){ 
    try {

      await this.auth.sendPasswordResetEmail(this.changepass);
      await loader.dismiss();
      await this.helper.showAlert("Correo de recuperación enviado correctamente", "Éxito");
      await this.router.navigateByUrl('login');
    } catch (error: any) {
      await loader.dismiss();
      if (error.code === 'auth/invalid-email') {
        await this.helper.showAlert("Error en el formato del correo", "Error");
      } else if (error.code === 'auth/user-not-found') {
        await this.helper.showAlert("Usuario no encontrado", "Error");
      } else {
        await this.helper.showAlert("Debe Ingresar un correo","Ocurrió un error inesperado");
      }
    }
  } 
}

}