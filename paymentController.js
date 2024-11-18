// paymentController.js
import express from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const app = express();
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: 'TEST-2367008211154500-071821-d6ccd3b65b7911ebd282d31c002c848a-768476125', // Reemplaza con tu token de acceso
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'
  }
});

const payment = new Payment(client);

app.post('/api/pay', async (req, res) => {
  const { amount, description, paymentMethodId, email } = req.body;

  const body = {
    transaction_amount: amount,
    description: description,
    payment_method_id: paymentMethodId,
    payer: {
      email: email
    }
  };

  try {
    const response = await payment.create({ body });
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(8101, () => {
  console.log('Server is running on port 8101');
});
