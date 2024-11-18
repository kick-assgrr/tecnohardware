import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = ""; 
  password: string = ""; 
  formularioLogin: FormGroup;

  private animation!: Animation;
  constructor(
    private router: Router,
    private helperService: HelperService,
    private storage: StorageService,
    private auth: AngularFireAuth,
    public fb: FormBuilder
  ) {
    this.formularioLogin = this.fb.group({
      'email': new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      'password': new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(50)])
    })
  }

  ngOnInit() {}

  async login() {
    if (this.email == "") {
      this.helperService.showToast("Debe ingresar un email.");
      return;
    }
    if (this.password == "") {
      this.helperService.showToast("Debe ingresar una contraseña.");
      return;
    }

    try {
      this.storage.useremail = this.email;
      const req = await this.auth.signInWithEmailAndPassword(this.email, this.password);
      console.log("TOKEN", await req.user?.getIdToken());
      await this.router.navigateByUrl('menu');
    } catch (error) {
      this.helperService.showAlert("Crea una cuenta para iniciar sesion", "El correo electrónico no está registrado")
    }
  }

  recoverpassword() {
    this.router.navigateByUrl("recover-password");
  }

  regist() {
    this.router.navigateByUrl("regist");
  }

  async loginWithGoogle() {
    try {
      const result = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      if (result.user) {
        this.helperService.showAlert("Ha ingresado de manera exitosa", "Éxito");
        await this.router.navigateByUrl('menu');
      }
    } catch (error) {
      this.helperService.showAlert("Hubo un error al iniciar sesión con Google." , "Error");
    }
  }
}