import crypto from 'crypto';

import {
  SnailPayRequest,
  SnailPayResponse,
} from '../types/snailpay';

const TEST_CARD = '1234123412341234';
const TEST_EXPIRATION = '12/26';
const TEST_CVV = '543';

export const processPayment = (
  payment: SnailPayRequest,
): SnailPayResponse => {

  const operationId = crypto.randomUUID();

  const reference = `SNAIL-${Date.now()}`;

  const baseResponse = {
    id: operationId,
    transaction_amount: payment.amount,
    date_created: new Date().toISOString(),
    payer_id: payment.payerId,
    payer_email: payment.payerEmail,
    card_number: payment.cardNumber,
    cvv: payment.cvv,
    reference,
  };

  /*
   * Simulación de error del sistema.
   *
   * Se activa enviando:
   * cardNumber = 0000000000000000
   */
  if (payment.cardNumber === '0000000000000000') {
    return {
      ...baseResponse,
      status: 'error',
      status_detail: 'SnailPay no está disponible temporalmente.',
      authorization_code: null,
    };
  }

  /*
   * Validaciones de la transacción.
   */
  if (
    payment.cardNumber !== TEST_CARD ||
    payment.expirationDate !== TEST_EXPIRATION ||
    payment.cvv !== TEST_CVV
  ) {
    return {
      ...baseResponse,
      status: 'rejected',
      status_detail: 'La tarjeta fue rechazada.',
      authorization_code: null,
    };
  }

  if (
    !payment.fullName.trim() ||
    payment.amount <= 0 ||
    !Number.isFinite(payment.amount)
  ) {
    return {
      ...baseResponse,
      status: 'rejected',
      status_detail: 'Los datos de la transacción son inválidos.',
      authorization_code: null,
    };
  }

  /*
   * Cobro exitoso.
   */
  return {
    ...baseResponse,
    status: 'approved',
    status_detail: 'La operación fue aprobada correctamente.',
    authorization_code: `AUTH-${Math.floor(
      100000 + Math.random() * 900000,
    )}`,
  };
};