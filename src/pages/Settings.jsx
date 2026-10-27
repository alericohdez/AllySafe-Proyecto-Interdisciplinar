import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Type, LogOut, User } from 'lucide-react';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, fontSize, setFontSize } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF2FF]">
      <Header showBack={true} title="Ajustes" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pb-10">
        <section className="mt-2 mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            A tu medida.
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tu perfil y tus preferencias, en un lugar.
          </p>
        </section>

        <div className="bg-white dark:bg-[#262626] border border-slate-200 dark:border-slate-700 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-[#2563EB] dark:text-blue-400 font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white text-sm">
                Usuario Ejemplo
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                usuario.ejemplo@correo.es
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#262626] border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-5 shadow-xs mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Lectura y apariencia
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Modo oscuro
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {darkMode ? 'Activado' : 'Desactivado'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Alternar modo oscuro"
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                darkMode ? 'bg-[#2563EB]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Tamaño del texto
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFontSize('small')}
                className={`py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                  fontSize === 'small'
                    ? 'bg-[#2563EB] text-white border-[#2563EB]'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Pequeño
              </button>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                  fontSize === 'normal'
                    ? 'bg-[#2563EB] text-white border-[#2563EB]'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                  fontSize === 'large'
                    ? 'bg-[#2563EB] text-white border-[#2563EB]'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Grande
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full py-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </main>
    </div>
  );
}