import { afterEach, describe, expect, it, vi } from "vitest";

import { chargeSnailPay } from "./snailpay.service";

describe("snailpay.service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const payment = {
    cardNumber: "1234123412341234",
    expirationDate: "12/26",
    cvv: "543",
    fullName: "Cesar Echeverria",
    amount: 500,
    payerId: "user-123",
    payerEmail: "cesar@example.com",
  };

  it("debe procesar correctamente una transacción aprobada", async () => {
    const responseData = {
      id: "operation-001",
      status: "approved",
      status_detail: "La operación fue aprobada correctamente.",
      transaction_amount: 500,
      date_created: new Date().toISOString(),
      authorization_code: "123456",
      reference: "SNAIL-001",
      payer_id: "user-123",
      payer_email: "cesar@example.com",
      card_number: "1234123412341234",
      cvv: "543",
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const result = await chargeSnailPay(payment);

    expect(result.status).toBe("approved");
    expect(result.transaction_amount).toBe(500);
    expect(result.authorization_code).toBe("123456");
  });

  it("debe devolver una transacción rechazada", async () => {
    const responseData = {
      id: "operation-002",
      status: "rejected",
      status_detail: "La tarjeta fue rechazada.",
      transaction_amount: 500,
      date_created: new Date().toISOString(),
      authorization_code: null,
      reference: "SNAIL-002",
      payer_id: "user-123",
      payer_email: "cesar@example.com",
      card_number: "1111111111111111",
      cvv: "543",
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(responseData), {
        status: 402,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const result = await chargeSnailPay({
      ...payment,
      cardNumber: "1111111111111111",
    });

    expect(result.status).toBe("rejected");
    expect(result.status_detail).toBe("La tarjeta fue rechazada.");
    expect(result.authorization_code).toBeNull();
  });

  it("debe devolver un error cuando SnailPay no está disponible", async () => {
    const responseData = {
      id: "operation-003",
      status: "error",
      status_detail: "SnailPay no está disponible temporalmente.",
      transaction_amount: 500,
      date_created: new Date().toISOString(),
      authorization_code: null,
      reference: "SNAIL-003",
      payer_id: "user-123",
      payer_email: "cesar@example.com",
      card_number: "0000000000000000",
      cvv: "543",
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(responseData), {
        status: 503,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const result = await chargeSnailPay({
      ...payment,
      cardNumber: "0000000000000000",
    });

    expect(result.status).toBe("error");
    expect(result.status_detail).toBe(
      "SnailPay no está disponible temporalmente.",
    );
  });

  it("debe enviar la información del pago al endpoint correcto", async () => {
    const responseData = {
      id: "operation-004",
      status: "approved",
      status_detail: "La operación fue aprobada correctamente.",
      transaction_amount: 500,
      date_created: new Date().toISOString(),
      authorization_code: "654321",
      reference: "SNAIL-004",
      payer_id: "user-123",
      payer_email: "cesar@example.com",
      card_number: "1234123412341234",
      cvv: "543",
    };

    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    await chargeSnailPay(payment);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/snailpay/charge"),
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
  });
  it("debe cancelar la petición cuando supera el tiempo límite", async () => {
    vi.useFakeTimers();

    let requestSignal: AbortSignal | null | undefined;

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation((_input, init) => {
        requestSignal = init?.signal;

        return new Promise((_, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(
              new DOMException("The operation was aborted.", "AbortError"),
            );
          });
        });
      });

    const promise = chargeSnailPay(payment);

    const handledPromise = promise.catch((error: unknown) => error);

    await vi.advanceTimersByTimeAsync(10000);

    const error = await handledPromise;

    expect(requestSignal?.aborted).toBe(true);
    expect(fetchMock).toHaveBeenCalled();
    expect(error).toBeInstanceOf(DOMException);

    if (error instanceof DOMException) {
      expect(error.name).toBe("AbortError");
    }
  });
});
