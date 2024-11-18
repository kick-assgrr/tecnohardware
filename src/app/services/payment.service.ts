import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/pay'; // Asegúrate de usar la URL correcta de tu backend

  constructor() {}

  async makePayment(amount: number, description: string, paymentMethodId: string, email: string) {
    try {
      const response = await axios.post(this.apiUrl, {
        amount,
        description,
        paymentMethodId,
        email
      });
      return response.data;
    } catch (error) {
      console.error('Error making payment:', error);
      throw error;
    }
  }
}