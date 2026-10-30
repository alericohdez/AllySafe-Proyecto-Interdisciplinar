import { Link, useNavigate } from 'react-router-dom';
import { Leaf, HelpCircle, SlidersHorizontal, Mail, EyeOff, Info } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F3F7FC] dark:bg-black font-inter transition-colors flex flex-col justify-between">
      <header className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Ir al inicio"
          className="w-9 h-9 rounded-xl bg-[#1D4ED8] flex items-center justify-center text-white shadow-xs hover:bg-blue-700 transition-colors"
        >
          <Leaf className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/ayuda"
            aria-label="Abrir ayuda"
            className="p-2 rounded-full text-slate-700 dark:text-[#C5D3FF] hover:bg-slate-200 dark:hover:bg-[#142146] transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </Link>
          <Link
            to="/ajustes"
            aria-label="Abrir ajustes"
            className="p-2 rounded-full text-slate-700 dark:text-[#C5D3FF] hover:bg-slate-200 dark:hover:bg-[#142146] transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-md w-full mx-auto px-4 sm:px-6 py-8 flex flex-col justify-center space-y-6">
        <section className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8F8FF] leading-tight">
            Tu alimentación, con más información.
          </h1>
          <p className="text-sm sm:text-base text-[#61738A] dark:text-[#C5D3FF]">
            Inicia sesión para guardar tus alimentos y tener tus alérgenos siempre a mano.
          </p>
        </section>

        <form className="space-y-4 bg-white dark:bg-[#142146] sm:p-6 p-4 rounded-2xl border border-slate-200 dark:border-[#142146] shadow-xs" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
              Correo electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                defaultValue="lucia.martin@correo.es"
                placeholder="tu@correo.es"
                className="w-full rounded-xl border border-slate-200 dark:border-black bg-slate-50 dark:bg-black py-3 pl-4 pr-10 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 dark:text-[#C5D3FF] absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                defaultValue="1234567890"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 dark:border-black bg-slate-50 dark:bg-black py-3 pl-4 pr-10 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
              />
              <button
                type="button"
                aria-label="Mostrar u ocultar contraseña"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#C5D3FF] hover:text-slate-600 cursor-pointer"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-right">
            <button type="button" className="text-xs font-semibold text-[#1D4ED8] dark:text-[#C5D3FF] cursor-pointer">
              ¿Has olvidado tu contraseña?
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-xs"
          >
            <span>→</span> Iniciar sesión
          </button>

          <p className="text-center text-xs text-slate-500 dark:text-[#C5D3FF] pt-2">
            ¿Es tu primera vez?{' '}
            <button type="button" className="font-semibold text-[#1D4ED8] dark:text-[#C5D3FF] cursor-pointer">
              Regístrate
            </button>
          </p>
        </form>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/50 dark:bg-[#142146] text-slate-500 dark:text-[#C5D3FF] text-[11px]">
          <Info className="w-4 h-4 shrink-0 text-slate-400 dark:text-[#C5D3FF]" />
          <p>Consulta la información y comprueba siempre el etiquetado del envase.</p>
        </div>
      </main>
    </div>
  );
}