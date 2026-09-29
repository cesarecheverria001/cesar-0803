import { Request, Response } from 'express';
import crypto from 'crypto';
import { processPayment } from '../services/snailpay.service';
import { SnailPayRequest } from '../types/snailpay';

export const charge = (
  req: Request,
  res: Response,
): void => {

  const payment = req.body as SnailPayRequest;

  if (
    !payment.cardNumber ||
    !payment.expirationDate ||
    !payment.cvv ||
    !payment.fullName ||
    !payment.amount ||
    !payment.payerId ||
    !payment.payerEmail
  ) {
    res.status(400).json({
      id: crypto.randomUUID(),
      status: 'rejected',
      status_detail: 'Faltan datos obligatorios.',
      transaction_amount: payment.amount ?? 0,
      date_created: new Date().toISOString(),
      authorization_code: null,
      reference: `SNAIL-${Date.now()}`,
      payer_id: payment.payerId ?? '',
      payer_email: payment.payerEmail ?? '',
      card_number: payment.cardNumber ?? '',
      cvv: payment.cvv ?? '',
    });

    return;
  }

  const result = processPayment(payment);

  if (result.status === 'error') {
    res.status(503).json(result);
    return;
  }

  if (result.status === 'rejected') {
    res.status(402).json(result);
    return;
  }

  res.status(200).json(result);
};