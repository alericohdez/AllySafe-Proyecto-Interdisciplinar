import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Moon, Type, ChevronRight, LogOut, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, fontSize, setFontSize } = useTheme();

  return (
    <div className="min-h-screen bg-[#F3F7FC] dark:bg-black font-inter transition-colors">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Volver al inicio"
          className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#142146] transition-colors cursor-pointer mb-4"
        >
          <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-[#F8F8FF]" />
        </button>

        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8F8FF]">
            A tu medida.
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-[#C5D3FF] mt-1">
            Tu perfil y tus preferencias, en un lugar.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#142146] border border-slate-200 dark:border-[#142146] rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-black flex items-center justify-center text-[#1D4ED8] dark:text-[#C5D3FF] font-bold text-sm">
                  LM
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-[#F8F8FF] text-sm">
                    Lucía Martín
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-[#C5D3FF]">
                    lucia.martin@correo.es
                  </p>
                </div>
              </div>
              <button type="button" aria-label="Editar perfil" className="p-2 text-blue-600 dark:text-[#C5D3FF] hover:bg-blue-50 dark:hover:bg-black rounded-lg transition-colors cursor-pointer">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-[#F8F8FF]">
                  Mis alergias
                </h2>
                <button type="button" className="text-xs font-semibold text-blue-600 dark:text-[#C5D3FF] cursor-pointer">
                  Editar
                </button>
              </div>
              <div className="bg-white dark:bg-[#142146] border border-slate-200 dark:border-[#142146] rounded-2xl p-4 space-y-3 shadow-xs">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1D4ED8] text-white text-xs font-semibold">
                    <Check className="w-3.5 h-3.5" /> Leche
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1D4ED8] text-white text-xs font-semibold">
                    <Check className="w-3.5 h-3.5" /> Frutos de cáscara
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#C5D3FF]">
                  Destacaremos estos alérgenos en los alimentos que consultes, incluidas las posibles trazas.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-[#F8F8FF] mb-2 px-1">
                Lectura y apariencia
              </h2>
              <div className="bg-white dark:bg-[#142146] border border-slate-200 dark:border-[#142146] rounded-2xl p-4 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-slate-700 dark:text-[#C5D3FF]" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-[#F8F8FF]">
                        Modo oscuro
                      </p>
                      <p className="text-xs text-slate-500 dark:text-[#C5D3FF]">
                        {darkMode ? 'Activado' : 'Desactivado'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDarkMode(!darkMode)}
                    aria-label="Alternar modo oscuro"
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                      darkMode ? 'bg-[#1D4ED8]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`bg-white dark:bg-[#F8F8FF] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-black">
                  <div className="flex items-center gap-3 mb-3">
                    <Type className="w-5 h-5 text-slate-700 dark:text-[#C5D3FF]" />
                    <p className="text-sm font-semibold text-slate-800 dark:text-[#F8F8FF]">
                      Tamaño del texto
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-black p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setFontSize('small')}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        fontSize === 'small'
                          ? 'bg-[#1D4ED8] text-white font-semibold'
                          : 'text-slate-600 dark:text-[#C5D3FF]'
                      }`}
                    >
                      Pequeño
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize('normal')}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        fontSize === 'normal'
                          ? 'bg-[#1D4ED8] text-white font-semibold'
                          : 'text-slate-600 dark:text-[#C5D3FF]'
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize('large')}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        fontSize === 'large'
                          ? 'bg-[#1D4ED8] text-white font-semibold'
                          : 'text-slate-600 dark:text-[#C5D3FF]'
                      }`}
                    >
                      Grande
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-[#F8F8FF]">
                  Mis alimentos
                </h2>
                <span className="text-xs font-semibold text-blue-600 dark:text-[#C5D3FF]">
                  1 creado
                </span>
              </div>
              <Link
                to="/"
                className="bg-white dark:bg-[#142146] border border-slate-200 dark:border-[#142146] rounded-2xl p-3 flex items-center justify-between shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-black overflow-hidden shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&auto=format&fit=crop"
                      alt="Galletas de avena"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-[#F8F8FF]">
                      Galletas de avena
                    </p>
                    <p className="text-xs text-slate-500 dark:text-[#C5D3FF]">
                      Campo Claro · Galletas
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-[#C5D3FF]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-4 max-w-sm mx-auto">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full py-3 text-blue-600 dark:text-[#C5D3FF] font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-[#142146] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}