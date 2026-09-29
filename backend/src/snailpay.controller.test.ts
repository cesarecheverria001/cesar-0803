import { describe, expect, it } from 'vitest';
import request from 'supertest';

import app from './app';

const validPayment = {
  cardNumber: '1234123412341234',
  expirationDate: '12/26',
  cvv: '543',
  fullName: 'Cesar Echeverria',
  amount: 500,
  payerId: 'user-123',
  payerEmail: 'cesar@example.com',
};

describe('SnailPay API', () => {
  it('debe aprobar una transacción válida', async () => {
    const response = await request(app)
      .post('/api/snailpay/charge')
      .send(validPayment);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('approved');
    expect(response.body.transaction_amount).toBe(500);
    expect(response.body.authorization_code).not.toBeNull();
  });

  it('debe rechazar una tarjeta inválida', async () => {
    const response = await request(app)
      .post('/api/snailpay/charge')
      .send({
        ...validPayment,
        cardNumber: '1111111111111111',
      });

    expect(response.status).toBe(402);
    expect(response.body.status).toBe('rejected');
    expect(response.body.authorization_code).toBeNull();
  });

  it('debe devolver error cuando SnailPay no está disponible', async () => {
    const response = await request(app)
      .post('/api/snailpay/charge')
      .send({
        ...validPayment,
        cardNumber: '0000000000000000',
      });

    expect(response.status).toBe(503);
    expect(response.body.status).toBe('error');
  });

  it('debe rechazar una solicitud con campos obligatorios faltantes', async () => {
    const response = await request(app)
      .post('/api/snailpay/charge')
      .send({
        cardNumber: validPayment.cardNumber,
        expirationDate: validPayment.expirationDate,
        cvv: validPayment.cvv,
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('rejected');
  });
});