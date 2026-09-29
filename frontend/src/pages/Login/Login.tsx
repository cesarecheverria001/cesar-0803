import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  createSession,
  getUser,
} from '../../services/storage.service';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');

    if (!email.trim() || !password) {
      setError('Ingresa tu correo y contraseña.');
      return;
    }

    const user = getUser();

    if (!user) {
      setError('No existe un usuario registrado.');
      return;
    }

    if (
      user.email !== email.trim().toLowerCase() ||
      user.password !== password
    ) {
      setError('El correo o la contraseña son incorrectos.');
      return;
    }

    createSession();

    navigate('/dashboard');
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">

        <section className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <div className="mb-8 text-center">
            <div className="mb-4 text-6xl">
              🐌
            </div>

            <h1 className="text-3xl font-bold text-white">
              Bienvenido
            </h1>

            <p className="mt-2 text-slate-400">
              Inicia sesión en Snail Race
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-600"
            >
              Iniciar sesión
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Crear cuenta
            </Link>
          </p>

        </section>

      </div>
    </main>
  );
}

export default Login;