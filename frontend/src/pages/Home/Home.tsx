import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <section className="w-full max-w-4xl text-center">

        <div className="text-8xl mb-6">
          🐌
        </div>

        <span className="inline-block rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-400">
          SNAIL RACE
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
          Las carreras más lentas
          <span className="block text-indigo-400">
            y emocionantes.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Simula tus apuestas, administra tu saldo y descubre
          qué caracol domina la pista.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            to="/login"
            className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-600"
          >
            Iniciar sesión
          </Link>

          <Link
            to="/register"
            className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Crear cuenta
          </Link>

        </div>
      </section>
    </main>
  );
}

export default Home;