import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  closeSession,
  getUser,
} from '../../services/storage.service';
import BetsChart from '../../components/charts/BetsChart';
import SnailVictoriesChart from '../../components/charts/SnailVictoriesChart';
import AddBalanceModal from '../../components/payment/AddBalanceModal';

function Dashboard() {
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [balance, setBalance] = useState(getUser()?.balance ?? 0);  
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    closeSession();
    navigate('/login');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐌</span>

            <div>
              <h1 className="font-bold">Snail Race</h1>

              <p className="text-xs text-slate-500">Dashboard</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <p className="text-sm text-slate-500">Bienvenido de nuevo</p>

          <h2 className="mt-1 text-3xl font-bold">{user?.fullName}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Saldo disponible</p>

            <p className="mt-3 text-4xl font-bold text-indigo-400">
              ${balance.toFixed(2)}
            </p>

            <button
              type="button"
              onClick={() => setShowAddBalance(true)}
              className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              + Cargar saldo
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Apuestas ganadas</p>

            <p className="mt-3 text-4xl font-bold">0</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Apuestas perdidas</p>

            <p className="mt-3 text-4xl font-bold">0</p>
          </div>

          <BetsChart />
          <SnailVictoriesChart />
        </div>
      </section>
      {showAddBalance && (
        <AddBalanceModal
          onClose={() => setShowAddBalance(false)}
          onBalanceUpdated={(newBalance) => {
            setBalance(newBalance);
          }}
        />
      )}
    </main>
  );
}

export default Dashboard;