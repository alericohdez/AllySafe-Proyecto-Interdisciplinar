import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Moon, Type, LogOut, Check, Pencil } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { obtenerAlimentos } from '../services/api';

export default function Settings() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, fontSize, setFontSize } = useTheme();

  const [usuario] = useState(() => {
    const usuarioGuardado = sessionStorage.getItem('usuarioAllySafe');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const [misAlimentos, setMisAlimentos] = useState([]);
  const [cargandoAlimentos, setCargandoAlimentos] = useState(true);

  // Cargar y filtrar los alimentos creados por el usuario activo
  useEffect(() => {
    const cargarMisAlimentos = async () => {
      if (!usuario?.idUsuario) {
        setCargandoAlimentos(false);
        return;
      }
      try {
        const todos = await obtenerAlimentos();
        const propios = todos.filter(
          (item) => item.usuario?.idUsuario === usuario.idUsuario
        );
        setMisAlimentos(propios);
      } catch (error) {
        console.error('Error al cargar los alimentos del usuario:', error);
      } finally {
        setCargandoAlimentos(false);
      }
    };

    cargarMisAlimentos();
  }, [usuario]);

  const handleLogout = () => {
    sessionStorage.removeItem('usuarioAllySafe');
    navigate('/login');
  };

  const handleEditarAlimento = (alimento) => {
    // Navega a AddFood.jsx pasando el alimento completo en location.state
    navigate('/nuevo-alimento', { state: { alimentoEditar: alimento } });
  };

  const obtenerIniciales = (nombre) => {
    if (!nombre) return 'US';
    const partes = nombre.trim().split(' ');
    if (partes.length >= 2) {
      return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
    }
    return nombre.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#F3F7FC] dark:bg-black font-inter transition-colors">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
        <button
          type="button"
          onClick={() => navigate('/home')}
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
            {/* Tarjeta de perfil */}
            <div className="bg-white dark:bg-[#142146] border border-slate-200 dark:border-[#142146] rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-black flex items-center justify-center text-[#1D4ED8] dark:text-[#C5D3FF] font-bold text-sm">
                  {obtenerIniciales(usuario?.nombre)}
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-[#F8F8FF] text-sm">
                    {usuario ? usuario.nombre : 'Invitado'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-[#C5D3FF]">
                    {usuario ? usuario.correo : 'Sin sesión activa'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Editar perfil"
                className="p-2 text-blue-600 dark:text-[#C5D3FF] hover:bg-blue-50 dark:hover:bg-black rounded-lg transition-colors cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {/* Mis alergias */}
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
            {/* Lectura y apariencia */}
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

            {/* Mis alimentos dinámicos */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-[#F8F8FF]">
                  Mis alimentos
                </h2>
                <span className="text-xs font-semibold text-blue-600 dark:text-[#C5D3FF]">
                  {misAlimentos.length} {misAlimentos.length === 1 ? 'creado' : 'creados'}
                </span>
              </div>

              {cargandoAlimentos ? (
                <div className="bg-white dark:bg-[#142146] border border-slate-200 dark:border-[#142146] rounded-2xl p-4 text-xs text-slate-500 dark:text-[#C5D3FF]">
                  Cargando tus alimentos...
                </div>
              ) : misAlimentos.length === 0 ? (
                <div className="bg-white dark:bg-[#142146] border border-slate-200 dark:border-[#142146] rounded-2xl p-4 text-center space-y-2">
                  <p className="text-xs text-slate-500 dark:text-[#C5D3FF]">
                    {usuario
                      ? 'Todavía no has añadido ningún alimento.'
                      : 'Inicia sesión para ver y editar tus alimentos creados.'}
                  </p>
                  {usuario && (
                    <button
                      type="button"
                      onClick={() => navigate('/nuevo-alimento')}
                      className="text-xs font-semibold text-[#1D4ED8] dark:text-[#C5D3FF] hover:underline cursor-pointer"
                    >
                      + Añadir mi primer alimento
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {misAlimentos.map((item) => (
                    <div
                      key={item.idAlimento}
                      className="bg-white dark:bg-[#142146] border border-slate-200 dark:border-[#142146] rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-[#F8F8FF] truncate">
                          {item.nombre}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-[#C5D3FF] truncate">
                          {item.marca || 'Marca genérica'} · {item.categoria?.nombre || 'Sin categoría'}
                          {item.calorias != null ? ` · ${item.calorias} kcal` : ''}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleEditarAlimento(item)}
                        aria-label={`Editar ${item.nombre}`}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-black text-[#1D4ED8] dark:text-[#C5D3FF] hover:bg-blue-100 dark:hover:bg-slate-900 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Editar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleLogout}
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