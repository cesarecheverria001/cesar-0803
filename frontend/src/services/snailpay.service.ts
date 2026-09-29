import type {
  SnailPayRequest,
  SnailPayResponse,
} from '../types/snailpay';

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const chargeSnailPay = async (
  payment: SnailPayRequest,
): Promise<SnailPayResponse> => {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(
      `${API_URL}/api/snailpay/charge`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
        signal: controller.signal,
      },
    );

    const data = (await response.json()) as SnailPayResponse;

    return data;
  } finally {
    clearTimeout(timeout);
  }
};