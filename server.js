import express from 'express';
import { json } from 'body-parser';
import { configure, preferences } from 'mercadopago';

const app = express();
app.use(json());

configure({
  access_token: 'TEST-2367008211154500-071821-d6ccd3b65b7911ebd282d31c002c848a-768476125'
});

app.post('/create_preference', async (req, res) => {
  const { items } = req.body;

  let preference = {
    items: items.map(item => ({
      title: item.title,
      unit_price: item.unit_price,
      quantity: item.quantity,
      currency_id: 'CLP'
    })),
    back_urls: {
      success: 'http://localhost:8100/success',
      failure: 'http://localhost:8100/failure',
      pending: 'http://localhost:8100/pending'
    },
    auto_return: 'approved'
  };

  try {
    const response = await preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).json({ error: 'Error creating preference' });
  }
});

app.listen(1801, () => {
    console.log('Servidor escuchando en puerto 1801');
  });
