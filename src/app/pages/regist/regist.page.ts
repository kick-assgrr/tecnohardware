import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-regist',
  templateUrl: './regist.page.html',
  styleUrls: ['./regist.page.scss'],
})

export class RegistPage implements OnInit {
  email: any = '';
  password: any = '';

  regiones:any[]=[];
  comunas:any[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;


  constructor(
    private router:Router,
    private helperService:HelperService,
    private storageService:StorageService,
    private auth:AngularFireAuth,) { }
    

  ngOnInit() {
    this.userView();
  }

  back(){
    this.router.navigateByUrl("login");
  }
  
  
  async userView(){
    console.log("USUARIOS STORAGE",await this.storageService.obtenerUsuario());
  }
 

  async registro() {
    if (!this.email) {
      this.helperService.showAlert('Debe ingresar un email', '');
      return;
    }

    if (!this.password) {
      this.helperService.showAlert('Debe ingresar una contraseña', '');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.helperService.showAlert('El formato del correo no es válido', 'Intente nuevamente');
      return;
    }

    const loader = await this.helperService.showLoader('Cargando');
    try {
      const request = await this.auth.createUserWithEmailAndPassword(this.email, this.password);
      const user = [
        {
          email: this.email,
          password: this.password,
        },
      ];
      this.storageService.guardarUsuario(user);

      await this.router.navigateByUrl('login');
      await loader.dismiss();
      await this.helperService.showAlert('Registrado correctamente', '');
    } catch (error: any) {
      await loader.dismiss();
      if (error.code === 'auth/invalid-email') {
        await this.helperService.showAlert('El formato del correo no es válido', 'Intente nuevamente');
      } else if (error.code === 'auth/email-already-in-use') {
        await this.helperService.showAlert('El correo ya está en uso', 'Intente con otro correo');
      } else {
        await this.helperService.showAlert('Error al registrar', error.message);
      }
    }
  }
  

  cuentacreada(){
    if(this.email==""){
      this.helperService.showAlert("Debre ingresar un email","");
      return;
    }
    if(this.password==""){
      this.helperService.showAlert("Debre ingresar una contraseña","");
      return;
    }
    this.helperService.showAlert("Cuenta creada satisfactoriamente","Exito");
    
    
  }


}
