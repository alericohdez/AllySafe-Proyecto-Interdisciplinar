import { useState } from 'react';
import { Search, X, CheckCircle2, AlertCircle, RotateCcw, SlidersHorizontal } from 'lucide-react';

export default function BuscadorFiltros({
  categorias = [],
  alergenos = [],
  usuarioLogueado,
  filtrosActivos,
  onAplicarFiltros,
  onEliminarFiltroIndividual,
  onLimpiarTodo,
  totalResultados
}) {
  // Estados locales del formulario (borrador antes de confirmar)
  const [busqueda, setBusqueda] = useState(filtrosActivos.busqueda || '');
  const [alergenoNombre, setAlergenoNombre] = useState(filtrosActivos.alergenoNombre || '');
  const [categoriaId, setCategoriaId] = useState(filtrosActivos.categoriaId || '');
  const [maxCalorias, setMaxCalorias] = useState(filtrosActivos.maxCalorias || '');
  const [soloMios, setSoloMios] = useState(filtrosActivos.soloMios || false);

  // Estados de validación y confirmación (Ux 3)
  const [errores, setErrores] = useState({});
  const [confirmacion, setConfirmacion] = useState('');

  // Validaciones de longitud, formato y rangos
  const validarCampos = () => {
    const nuevosErrores = {};

    if (busqueda.trim().length > 50) {
      nuevosErrores.busqueda = 'La búsqueda no puede superar los 50 caracteres.';
    }

    if (maxCalorias !== '') {
      const valor = Number(maxCalorias);
      if (isNaN(valor) || valor < 0) {
        nuevosErrores.maxCalorias = 'Las calorías deben ser un número positivo o 0.';
      } else if (valor > 5000) {
        nuevosErrores.maxCalorias = 'El límite máximo permitido es 5000 kcal.';
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Aplicar búsqueda/filtros (no es obligatorio rellenar ningún campo)
  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmacion('');

    if (!validarCampos()) return;

    const nuevosFiltros = {
      busqueda: busqueda.trim(),
      alergenoNombre,
      categoriaId,
      maxCalorias,
      soloMios: usuarioLogueado ? soloMios : false,
    };

    onAplicarFiltros(nuevosFiltros);

    const hayFiltros =
      nuevosFiltros.busqueda ||
      nuevosFiltros.alergenoNombre ||
      nuevosFiltros.categoriaId ||
      nuevosFiltros.maxCalorias !== '' ||
      nuevosFiltros.soloMios;

    setConfirmacion(
      hayFiltros
        ? 'Filtros aplicados correctamente.'
        : 'Mostrando todos los alimentos disponibles.'
    );
  };

  // Quitar un único filtro manteniendo intactos los demás
  const handleQuitarFiltro = (clave) => {
    if (clave === 'busqueda') setBusqueda('');
    if (clave === 'alergenoNombre') setAlergenoNombre('');
    if (clave === 'categoriaId') setCategoriaId('');
    if (clave === 'maxCalorias') setMaxCalorias('');
    if (clave === 'soloMios') setSoloMios(false);

    onEliminarFiltroIndividual(clave);
    setConfirmacion('Filtro eliminado. Resultados actualizados.');
  };

  // Limpiar todo el formulario
  const handleLimpiar = () => {
    setBusqueda('');
    setAlergenoNombre('');
    setCategoriaId('');
    setMaxCalorias('');
    setSoloMios(false);
    setErrores({});
    setConfirmacion('Filtros restablecidos.');
    onLimpiarTodo();
  };

  const nombreCategoriaActiva = categorias.find(
    (c) => String(c.idCategoria) === String(filtrosActivos.categoriaId)
  )?.nombre;

  const tieneFiltrosActivos =
    Boolean(filtrosActivos.busqueda) ||
    Boolean(filtrosActivos.alergenoNombre) ||
    Boolean(filtrosActivos.categoriaId) ||
    filtrosActivos.maxCalorias !== '' ||
    Boolean(filtrosActivos.soloMios);

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-3 text-left">
      {/* Campo 1: Barra de búsqueda principal */}
      <div className="space-y-1">
        <label htmlFor="busqueda-alimento" className="sr-only">
          Buscar productos, marcas o ingredientes
        </label>
        <div className="relative w-full">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#1D4ED8] dark:text-[#C5D3FF]">
            <Search className="h-5 w-5" />
          </span>
          <input
            id="busqueda-alimento"
            type="text"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              if (errores.busqueda) setErrores({ ...errores, busqueda: null });
            }}
            placeholder="Buscar productos, marcas o ingredientes..."
            aria-invalid={Boolean(errores.busqueda)}
            className={`w-full rounded-xl border bg-white dark:bg-[#142146] py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-[#F8F8FF] placeholder:text-slate-400 dark:placeholder:text-[#C5D3FF]/60 focus:outline-none focus:ring-2 transition-all shadow-xs ${
              errores.busqueda
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-300 dark:border-[#142146] focus:border-[#1D4ED8] focus:ring-[#1D4ED8]/20'
            }`}
          />
        </div>
        {errores.busqueda && (
          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 px-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errores.busqueda}
          </p>
        )}
      </div>

      {/* Fila de Selectores (Alérgenos a evitar, Categoría y Calorías máx.) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        {/* Selector de Alérgenos (desde GET /api/alergeno/listar) */}
        <div className="relative w-full">
          <label htmlFor="filtro-alergeno" className="sr-only">
            Excluir alérgeno
          </label>
          <select
            id="filtro-alergeno"
            value={alergenoNombre}
            onChange={(e) => setAlergenoNombre(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-300 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 pl-3.5 pr-9 text-sm font-medium text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none shadow-xs"
          >
            <option value="">Sin alérgeno...</option>
            {alergenos.map((al) => (
              <option key={al.idAlergeno} value={al.nombre}>
                Sin {al.nombre}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-700 dark:text-[#C5D3FF]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        {/* Selector de Categoría (desde GET /api/categoria/listar) */}
        <div className="relative w-full">
          <label htmlFor="filtro-categoria" className="sr-only">
            Categoría
          </label>
          <select
            id="filtro-categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-300 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 pl-3.5 pr-9 text-sm font-medium text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none shadow-xs"
          >
            <option value="">Categoría</option>
            {categorias.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-700 dark:text-[#C5D3FF]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        {/* Rango de Calorías Máximas */}
        <div className="space-y-1">
          <label htmlFor="filtro-calorias" className="sr-only">
            Calorías máximas
          </label>
          <input
            id="filtro-calorias"
            type="number"
            min="0"
            max="5000"
            value={maxCalorias}
            onChange={(e) => {
              setMaxCalorias(e.target.value);
              if (errores.maxCalorias) setErrores({ ...errores, maxCalorias: null });
            }}
            placeholder="Máx. kcal (ej. 400)"
            aria-invalid={Boolean(errores.maxCalorias)}
            className={`w-full rounded-xl border bg-white dark:bg-[#142146] py-2.5 px-3.5 text-sm font-medium text-slate-900 dark:text-[#F8F8FF] placeholder:text-slate-400 dark:placeholder:text-[#C5D3FF]/60 focus:outline-none shadow-xs ${
              errores.maxCalorias
                ? 'border-red-500 focus:border-red-500'
                : 'border-slate-300 dark:border-[#142146] focus:border-[#1D4ED8]'
            }`}
          />
          {errores.maxCalorias && (
            <p className="text-[11px] text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errores.maxCalorias}
            </p>
          )}
        </div>
      </div>

      {/* Opción extra solo si hay sesión iniciada + Botones de acción */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div>
          {usuarioLogueado ? (
            <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-[#C5D3FF] cursor-pointer">
              <input
                type="checkbox"
                checked={soloMios}
                onChange={(e) => setSoloMios(e.target.checked)}
                className="rounded border-slate-300 text-[#1D4ED8] focus:ring-[#1D4ED8]"
              />
              Solo mis alimentos ({usuarioLogueado.nombre})
            </label>
          ) : (
            <span className="text-xs text-[#61738A] dark:text-[#C5D3FF]">
              Explorando como invitado · Inicia sesión para gestionar tus alimentos
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLimpiar}
            className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-[#142146] bg-white dark:bg-[#142146] text-slate-700 dark:text-[#C5D3FF] hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpiar
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filtrar
          </button>
        </div>
      </div>

      {/* Mensaje de confirmación */}
      {confirmacion && (
        <div
          role="status"
          className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {confirmacion} ({totalResultados} {totalResultados === 1 ? 'resultado' : 'resultados'})
          </span>
          <button
            type="button"
            onClick={() => setConfirmacion('')}
            aria-label="Cerrar confirmación"
            className="hover:opacity-75 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Chips de Filtros Activos (permite quitar 1 sin perder los demás) */}
      {tieneFiltrosActivos && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-[#61738A] dark:text-[#C5D3FF]">
            Activos:
          </span>

          {filtrosActivos.busqueda && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-[#142146] text-[#1D4ED8] dark:text-[#C5D3FF] text-xs font-semibold">
              "{filtrosActivos.busqueda}"
              <button
                type="button"
                onClick={() => handleQuitarFiltro('busqueda')}
                aria-label="Quitar búsqueda de texto"
                className="hover:text-red-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {filtrosActivos.alergenoNombre && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-[#142146] text-[#1D4ED8] dark:text-[#C5D3FF] text-xs font-semibold">
              Sin {filtrosActivos.alergenoNombre}
              <button
                type="button"
                onClick={() => handleQuitarFiltro('alergenoNombre')}
                aria-label="Quitar filtro de alérgeno"
                className="hover:text-red-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {filtrosActivos.categoriaId && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-[#142146] text-[#1D4ED8] dark:text-[#C5D3FF] text-xs font-semibold">
              {nombreCategoriaActiva || 'Categoría'}
              <button
                type="button"
                onClick={() => handleQuitarFiltro('categoriaId')}
                aria-label="Quitar filtro de categoría"
                className="hover:text-red-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {filtrosActivos.maxCalorias !== '' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-[#142146] text-[#1D4ED8] dark:text-[#C5D3FF] text-xs font-semibold">
              ≤ {filtrosActivos.maxCalorias} kcal
              <button
                type="button"
                onClick={() => handleQuitarFiltro('maxCalorias')}
                aria-label="Quitar filtro de calorías"
                className="hover:text-red-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {filtrosActivos.soloMios && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-[#142146] text-[#1D4ED8] dark:text-[#C5D3FF] text-xs font-semibold">
              Mis alimentos
              <button
                type="button"
                onClick={() => handleQuitarFiltro('soloMios')}
                aria-label="Quitar filtro de mis alimentos"
                className="hover:text-red-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>
      )}
    </form>
  );
}