import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BuscadorFiltros from '../components/BuscadorFiltros';
import FoodResults from '../components/FoodResults';
import {
  obtenerAlimentos,
  obtenerCategorias,
  obtenerAlergenos,
  eliminarAlimento
} from '../services/api';

const FILTROS_INICIALES = {
  busqueda: '',
  alergenoNombre: '',
  categoriaId: '',
  maxCalorias: '',
  soloMios: false,
};

export default function Home() {
  const [usuario] = useState(() => {
    const sesion = sessionStorage.getItem('usuarioAllySafe');
    return sesion ? JSON.parse(sesion) : null;
  });

  const [alimentos, setAlimentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [alergenos, setAlergenos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorBackend, setErrorBackend] = useState(null);

  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const [dataAlimentos, dataCategorias, dataAlergenos] = await Promise.all([
          obtenerAlimentos(),
          obtenerCategorias(),
          obtenerAlergenos(),
        ]);
        setAlimentos(dataAlimentos);
        setCategorias(dataCategorias);
        setAlergenos(dataAlergenos);
      } catch (err) {
        setErrorBackend(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const alimentosFiltrados = useMemo(() => {
    return alimentos.filter((item) => {

      if (filtros.busqueda.trim() !== '') {
        const q = filtros.busqueda.toLowerCase();
        const coincide =
          item.nombre?.toLowerCase().includes(q) ||
          item.marca?.toLowerCase().includes(q) ||
          item.ingredientes?.toLowerCase().includes(q) ||
          item.codigoBarras?.toLowerCase().includes(q);
        if (!coincide) return false;
      }

      if (filtros.alergenoNombre) {
        if (item.ingredientes?.toLowerCase().includes(filtros.alergenoNombre.toLowerCase())) {
          return false;
        }
      }

      if (filtros.categoriaId) {
        if (String(item.categoria?.idCategoria) !== String(filtros.categoriaId)) {
          return false;
        }
      }

      if (filtros.maxCalorias !== '') {
        if (item.calorias == null || Number(item.calorias) > Number(filtros.maxCalorias)) {
          return false;
        }
      }

      if (filtros.soloMios && usuario?.idUsuario) {
        if (item.usuario?.idUsuario !== usuario.idUsuario) {
          return false;
        }
      }

      return true;
    });
  }, [alimentos, filtros, usuario]);

  const handleEliminarFiltroIndividual = (clave) => {
    setFiltros((prev) => ({
      ...prev,
      [clave]: clave === 'soloMios' ? false : '',
    }));
  };

  const handleRestablecerFiltros = () => {
    setFiltros(FILTROS_INICIALES);
  };

  const handleEliminarAlimento = async (idAlimento) => {
    if (!window.confirm('¿Seguro que deseas eliminar este alimento?')) return;
    try {
      await eliminarAlimento(idAlimento);
      setAlimentos((prev) => prev.filter((a) => a.idAlimento !== idAlimento));
      if (selectedId === idAlimento) setSelectedId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F7FC] dark:bg-[#000000] font-inter transition-colors">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col items-center">
        <div className="w-full flex flex-col items-center text-center space-y-4">
          <div className="lg:col-span-6 w-full flex flex-col items-start md:items-center text-left md:text-center space-y-4">
            <p className="text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-[#C5D3FF]">
              Tu despensa, más clara
            </p>
            <h1 className="text-3xl sm:text-4xl text-[#0F172A] dark:text-[#F8F8FF] font-extrabold leading-tight">
              Conoce lo que comes
            </h1>
            <p className="text-base sm:text-lg text-[#61738A] dark:text-[#C5D3FF]">
              Consulta alimentos y revisa sus alérgenos.
            </p>

            <div className="w-full pt-2">
              <BuscadorFiltros
                categorias={categorias}
                alergenos={alergenos}
                usuarioLogueado={usuario}
                filtrosActivos={filtros}
                onAplicarFiltros={setFiltros}
                onEliminarFiltroIndividual={handleEliminarFiltroIndividual}
                onLimpiarTodo={handleRestablecerFiltros}
                totalResultados={alimentosFiltrados.length}
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-[#61738A] dark:text-[#C5D3FF]">
              <svg className="h-4 w-4 shrink-0 text-[#61738A] dark:text-[#C5D3FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>
                Destacando tus alergias: <strong className="font-medium text-slate-700 dark:text-[#F8F8FF]">leche y frutos de cáscara</strong>
              </span>
            </div>

            <div className="w-full pt-2">
              {cargando ? (
                <p className="text-xs text-slate-500 dark:text-[#C5D3FF] py-4">
                  Cargando alimentos...
                </p>
              ) : errorBackend ? (
                <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
                  {errorBackend}
                </div>
              ) : (
                <FoodResults
                  filtered={alimentosFiltrados}
                  selectedId={selectedId}
                  onToggle={(id) => setSelectedId((prev) => (prev === id ? null : id))}
                  usuarioLogueado={usuario}
                  onEliminar={handleEliminarAlimento}
                  onRestablecerFiltros={handleRestablecerFiltros}
                />
              )}
            </div>

            <div className="w-full space-y-3 pt-2">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-[#142146] text-blue-600 dark:text-[#C5D3FF] text-xs">
                <span>ℹ️</span>
                <p>Comprueba siempre el etiquetado del envase. La información puede cambiar.</p>
              </div>

              <Link
                to="/nuevo-alimento"
                aria-label="Ir a la página de añadir alimento"
                className="block text-center w-full py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-[#F8F8FF] font-semibold text-sm transition-colors shadow-sm"
              >
                + Añadir alimento
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}