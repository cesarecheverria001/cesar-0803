import { FormEvent, useState } from "react";

import { getUser, updateUser } from "../../services/storage.service";

import { chargeSnailPay } from "../../services/snailpay.service";

import type { SnailPayResponse } from "../../types/snailpay";

interface AddBalanceModalProps {
  onClose: () => void;
  onBalanceUpdated: (newBalance: number) => void;
}

function AddBalanceModal({ onClose, onBalanceUpdated }: AddBalanceModalProps) {
  const user = getUser();

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const numericAmount = Number(amount);

    /*
     * Verificar que exista un usuario.
     */
    if (!user) {
      setMessage("No existe una sesión de usuario.");

      setMessageType("error");

      return;
    }

    /*
     * Validar monto.
     */
    if (numericAmount <= 0 || !Number.isFinite(numericAmount)) {
      setMessage("Ingresa un monto válido mayor a cero.");

      setMessageType("error");

      return;
    }

    /*
     * Evitar múltiples solicitudes mientras
     * SnailPay está procesando.
     */
    setLoading(true);

    try {
      const payment = {
        cardNumber,
        expirationDate,
        cvv,
        fullName,
        amount: numericAmount,
        payerId: user.id,
        payerEmail: user.email,
      };

      const data: SnailPayResponse = await chargeSnailPay(payment);

      if (data.status !== "approved") {
        setMessage(data.status_detail || "La transacción no fue aprobada.");

        setMessageType("error");

        return;
      }

      /*
       * La transacción fue aprobada.
       *
       * Ahora sí podemos modificar el saldo.
       */
      const newBalance = user.balance + data.transaction_amount;

      /*
       * Guardar el nuevo saldo en LocalStorage.
       */
      updateUser({
        ...user,
        balance: newBalance,
      });

      /*
       * Actualizar inmediatamente el Dashboard.
       */
      onBalanceUpdated(newBalance);

      /*
       * Mostrar confirmación.
       */
      setMessage(`Recarga aprobada. Referencia: ${data.reference}`);

      setMessageType("success");

      /*
       * Limpiar campos sensibles después
       * de una operación exitosa.
       */
      setCardNumber("");
      setExpirationDate("");
      setCvv("");
      setAmount("");
    } catch (error) {
      /*
       * Error de comunicación con Express.
       */
      console.error("Error comunicando con SnailPay:", error);

      setMessage("No fue posible comunicarse con SnailPay.");

      setMessageType("error");
    } finally {
      /*
       * Permitir nuevamente el envío.
       */
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* HEADER */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Cargar saldo</h2>

            <p className="mt-1 text-sm text-slate-400">
              Procesado mediante SnailPay
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-500 transition hover:text-white"
          >
            ×
          </button>
        </div>

        {/* MENSAJE */}

        {message && (
          <div
            className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
              messageType === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* FORMULARIO */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TARJETA */}

          <div>
            <label
              htmlFor="cardNumber"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Número de tarjeta
            </label>

            <input
              id="cardNumber"
              type="text"
              inputMode="numeric"
              maxLength={16}
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
              placeholder="1234123412341234"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              required
            />
          </div>

          {/* VENCIMIENTO + CVV */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expirationDate"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Vencimiento
              </label>

              <input
                id="expirationDate"
                type="text"
                maxLength={5}
                value={expirationDate}
                onChange={(event) => setExpirationDate(event.target.value)}
                placeholder="12/26"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cvv"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                CVV
              </label>

              <input
                id="cvv"
                type="text"
                inputMode="numeric"
                maxLength={3}
                value={cvv}
                onChange={(event) => setCvv(event.target.value)}
                placeholder="543"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* NOMBRE */}

          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Nombre completo
            </label>

            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              required
            />
          </div>

          {/* MONTO */}

          <div>
            <label
              htmlFor="amount"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Monto de recarga
            </label>

            <input
              id="amount"
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="500"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              required
            />
          </div>

          {/* BOTÓN */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Cargar saldo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBalanceModal;
