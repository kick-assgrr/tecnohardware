import { Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, deleteDoc, doc, setDoc, addDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore, private aFirestore: AngularFirestore) { }

  createIdDoc(): string {
    return uuidv4();
  }

  getcollectionChanges<tipo>(path: string): Observable<tipo[]> {
    const refcollection = collection(this.firestore, path);
    return collectionData(refcollection) as Observable<tipo[]>;
  }

  createProductoID(data: any, path: string, idDoc: string) {
    const document = doc(this.firestore, `${path}/${idDoc}`);
    return setDoc(document, data);
  }

  updateProductoID(data: any, path: string, idDoc: string) {
    const document = doc(this.firestore, `${path}/${idDoc}`);
    return updateDoc(document, data);
  }

  deleteProductoID(path: string, idDoc: string) {
    const document = doc(this.firestore, `${path}/${idDoc}`);
    return deleteDoc(document);
  }

  getDocumentRef(path: string, idDoc: string) { 
    return doc(this.firestore, `${path}/${idDoc}`);
  }

  async updateProductoCantidad(idDoc: string, nuevaCantidad: number) {
    const productRef = this.getDocumentRef('TarjetasVideo', idDoc);
    return updateDoc(productRef, { cantidad: nuevaCantidad });
  }

  getPaymentMethods(userId: string): Observable<any[]> {
    const paymentMethodsCollection = collection(this.firestore, `users/${userId}/paymentMethods`);
    return collectionData(paymentMethodsCollection, { idField: 'id' }) as Observable<any[]>;
  }

  addPaymentMethod(userId: string, paymentMethod: any) {
    const paymentMethodsCollection = collection(this.firestore, `users/${userId}/paymentMethods`);
    return addDoc(paymentMethodsCollection, paymentMethod);
  }

  deletePaymentMethod(userId: string, paymentMethodId: string) {
    const paymentMethodDoc = doc(this.firestore, `users/${userId}/paymentMethods/${paymentMethodId}`);
    return deleteDoc(paymentMethodDoc);
  }

  updatePaymentMethod(userId: string, paymentMethodId: string, paymentMethod: { tipo: string, numero: string, nombre: string, fechaVencimiento: string, cvv: string }) {
    const paymentMethodDoc = doc(this.firestore, `users/${userId}/paymentMethods/${paymentMethodId}`);
    return updateDoc(paymentMethodDoc, paymentMethod);
  }

  async agregarTarjetaBilletera(tarjeta: any): Promise<void> {
    try {
      await this.aFirestore.collection('users').doc('userID').collection('billetera').add(tarjeta);
    } catch (error) {
      console.error('Error al agregar tarjeta a la billetera:', error);
      throw error;
    }
  }

  obtenerTarjetasBilletera(): Observable<any[]> {
    return this.aFirestore.collection('users').doc('userID').collection('billetera').valueChanges({ idField: 'id' });
  }

  async eliminarTarjetaBilletera(tarjetaId: string): Promise<void> {
    try {
      await this.aFirestore.collection('users').doc('userID').collection('billetera').doc(tarjetaId).delete();
    } catch (error) {
      console.error('Error al eliminar tarjeta de la billetera:', error);
      throw error;
    }
  }

  
}