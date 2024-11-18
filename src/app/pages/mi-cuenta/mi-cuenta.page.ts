import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/models/usuario';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage {

  usuario: Usuario = {}; 
  providerId: string | null = null;

  constructor(private afAuth: AngularFireAuth, private storageService: StorageService, private loadingController: LoadingController, 
    private helperService:HelperService , private router: Router) {}

    ngOnInit() {
      this.afAuth.authState.subscribe(async user => {
        if (user) {
          const uid = user.uid;
          if (user.providerData && user.providerData.length > 0) {
            this.providerId = user.providerData[0]?.providerId || null;
            this.usuario.email = user.email || '';
  
            const datosUsuario = await this.storageService.obtenerDatosUsuario(uid);
            if (datosUsuario) {
              this.usuario.direccion = datosUsuario.direccion || '';
              this.usuario.telefono = datosUsuario.telefono || '';
  
              if (this.providerId === 'password') {
                this.usuario.nombre = datosUsuario.nombre || '';
                this.usuario.apellido = datosUsuario.apellido || '';
              } else if (this.providerId === 'google.com') {
                this.usuario.displayName = user.displayName || '';
                if (!datosUsuario.nombre && !datosUsuario.apellido) {
                  const nombreCompleto = user.displayName || '';
                  const [nombre, apellido] = nombreCompleto.split(' ');
                  this.usuario.nombre = nombre;
                  this.usuario.apellido = apellido;
  
                  const datos: Partial<Usuario> = {
                    nombre: this.usuario.nombre,
                    apellido: this.usuario.apellido
                  };
                  await this.storageService.guardarDatosUsuario(user, datos);
                } else {
                  this.usuario.nombre = datosUsuario.nombre;
                  this.usuario.apellido = datosUsuario.apellido;
                }
              }
            }
          }
        }
      });
    }
  
    async guardarDatosUsuario() {
      const loading = await this.helperService.showLoader('Guardando datos...');
  
      try {
        const user = await this.afAuth.currentUser;
        if (user) {
          const datos: Partial<Usuario> = {
            direccion: this.usuario.direccion,
            telefono: this.usuario.telefono,
          };
          if (this.providerId === 'password') {
            datos.nombre = this.usuario.nombre;
            datos.apellido = this.usuario.apellido;
          }
          await this.storageService.guardarDatosUsuario(user, datos);
          await this.helperService.showToast('Datos guardados correctamente');
        }
      } catch (error) {
        console.error('Error al guardar datos de usuario', error);
        await this.helperService.showAlert('Error al guardar datos', 'Error');
      } finally {
        await loading.dismiss();
      }
    }
  
    back() {
      this.router.navigateByUrl('menu');
    }
  }
  

/*   ngOnInit() {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    try {
      const usuarios = await this.storageService.obtenerUsuario();
      if (usuarios.length > 0) {
        this.usuario = usuarios[0];
        this.newPassword = this.usuario.password;
      }
    } catch (error) {
      console.error('Error al cargar datos de usuario', error);
    }
  }

  async guardarCambios() {
    try {
      await this.storageService.guardarUsuario([this.usuario]);
      await this.helperService.showAlert('Datos actualizados correctamente', 'Éxito');
    } catch (error) {
      console.error('Error al guardar cambios de usuario', error);
      await this.helperService.showAlert('Error al guardar cambios', 'Error');
    }
  }

  async editarCorreo() {
    // Mostrar un cuadro de diálogo para ingresar el nuevo correo electrónico
    this.nuevoEmail = ''; // Reiniciar el campo de nuevoEmail
  }

  async guardarNuevoCorreo() {
    try {
      await this.auth.currentUser.then(user => {
        return user?.updateEmail(this.nuevoEmail).then(() => {
          // Actualización exitosa del correo electrónico
          this.usuario.email = this.nuevoEmail;
          this.correoEditable = false; // Desactivar la edición después de guardar
          this.guardarCambios(); // Guardar otros cambios si es necesario
          this.helperService.showAlert('Correo electrónico actualizado correctamente', 'Éxito');
        });
      });
    } catch (error) {
      console.error('Error al actualizar el correo electrónico', error);
      this.helperService.showAlert('Error al actualizar el correo electrónico', 'Error');
    }
  }
  async updateEmail() {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        await user.updateEmail(this.newEmail);
        console.log('Email actualizado correctamente');
      } else {
        console.error('Usuario no encontrado');
      }
    } catch (error: any) {
      console.error('Error al actualizar el correo electrónico', error);
      // Manejar errores específicos, como operación no permitida
      if (error?.code === 'auth/operation-not-allowed') {
        console.error('Operación no permitida para actualizar el correo electrónico');
        // Lógica adicional si es necesario
      }
    }
  }
  
  



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  back() {
    this.router.navigateByUrl('menu');
  }
 */

