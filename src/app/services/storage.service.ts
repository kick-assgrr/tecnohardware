import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/models/usuario';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public useremail: any;

  constructor(
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async getItem(key: string): Promise<string | null> {
    const obj = await Preferences.get({ key: key });
    return obj.value;
  }

  async setItem(llave: string, valor: string) {
    await Preferences.set({ key: llave, value: valor });
  }

  async obtenerUsuario(): Promise<Usuario[]> {
    const storageData = await this.getItem('usuarioinfo');
    if (storageData == null) {
      return [];
    }

    const data: any[] = JSON.parse(storageData);
    if (data) {
      return data;
    } else {
      return [];
    }
  }

  async guardarUsuario(usuario: Usuario[]) {
    this.setItem('usuarioinfo', JSON.stringify(usuario));
  }

  async getUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }

  async actualizarContrasena(nuevaContrasena: string) {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.updatePassword(nuevaContrasena);
        console.log('Contraseña actualizada correctamente');
      } else {
        throw new Error('Usuario no autenticado.');
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      throw error;
    }
  }

  async guardarCarrito(carrito: any[]) {
    const uid = await this.getUserId();
    if (uid) {
      const storageKey = 'carritoInfo_' + uid;
      this.setItem(storageKey, JSON.stringify(carrito));
    } else {
      throw new Error('Usuario no autenticado.');
    }
  }

  async obtenerCarrito(): Promise<any[]> {
    const uid = await this.getUserId();
    if (uid) {
      const storageKey = 'carritoInfo_' + uid;
      const storageData = await this.getItem(storageKey);
      if (storageData === null) {
        return [];
      }
      return JSON.parse(storageData);
    } else {
      throw new Error('Usuario no autenticado.');
    }
  }

  async limpiarCarrito() {
    const uid = await this.getUserId();
    if (uid) {
      const storageKey = 'carritoInfo_' + uid;
      await Preferences.remove({ key: storageKey });
    } else {
      throw new Error('Usuario no autenticado.');
    }
  }

  async cambiarContraseña(nuevaContraseña: string) {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.updatePassword(nuevaContraseña);
      } else {
        throw new Error('Usuario no autenticado.');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }
  }

  async guardarDatosUsuario(user: any, datos: Partial<Usuario>) {
    try {
      await this.firestore.collection('users').doc(user.uid).set({
        ...datos,
        email: user.email,
        providerId: user.providerData[0].providerId
      }, { merge: true });
    } catch (error) {
      console.error('Error al guardar los datos del usuario en Firestore:', error);
    }
  }

  async obtenerDatosUsuario(uid: string): Promise<Usuario | null> {
    try {
      const doc = await this.firestore.collection('users').doc(uid).get().toPromise();
      if (doc && doc.exists) {
        return doc.data() as Usuario;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario desde Firestore:', error);
      return null;
    }
  }
}
