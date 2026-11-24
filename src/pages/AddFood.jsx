import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  HelpCircle,
  SlidersHorizontal,
  ChevronDown,
  Plus,
  Check,
  AlertCircle,
  Info,
  Upload,
  X
} from 'lucide-react';
import { obtenerCategorias, obtenerAlergenos } from '../services/api';

const API_URL = 'http://localhost:8080/api';

export default function AddFood() {
  const navigate = useNavigate();
  const location = useLocation();

  const alimentoEditar = location.state?.alimentoEditar || null;
  const esEdicion = Boolean(alimentoEditar);

  const [usuario] = useState(() => {
    const sesion = sessionStorage.getItem('usuarioAllySafe');
    return sesion ? JSON.parse(sesion) : null;
  });

  const [categorias, setCategorias] = useState([]);
  const [alergenosDisponibles, setAlergenosDisponibles] = useState([]);

  const [nombre, setNombre] = useState(alimentoEditar?.nombre || '');
  const [marca, setMarca] = useState(alimentoEditar?.marca || '');
  const [categoriaId, setCategoriaId] = useState(
    alimentoEditar?.categoria?.idCategoria || ''
  );
  const [calorias, setCalorias] = useState(
    alimentoEditar?.calorias != null ? String(alimentoEditar.calorias) : ''
  );
  const [codigoBarras, setCodigoBarras] = useState(alimentoEditar?.codigoBarras || '');
  const [ingredientes, setIngredientes] = useState(alimentoEditar?.ingredientes || '');

  const [contieneIds, setContieneIds] = useState(() => {
    if (!alimentoEditar?.alimentoAlergenos) return [];
    return alimentoEditar.alimentoAlergenos
      .filter((aa) => !aa.esTraza)
      .map((aa) => aa.alergeno?.idAlergeno);
  });

  const [trazasIds, setTrazasIds] = useState(() => {
    if (!alimentoEditar?.alimentoAlergenos) return [];
    return alimentoEditar.alimentoAlergenos
      .filter((aa) => aa.esTraza)
      .map((aa) => aa.alergeno?.idAlergeno);
  });

  const [mostrarSelectorAlergenos, setMostrarSelectorAlergenos] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatosMaestros = async () => {
      try {
        const [cats, algs] = await Promise.all([
          obtenerCategorias(),
          obtenerAlergenos()
        ]);
        setCategorias(cats);
        setAlergenosDisponibles(algs);

        if (!alimentoEditar && cats.length > 0) {
          setCategoriaId(cats[0].idCategoria);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    cargarDatosMaestros();
  }, [alimentoEditar]);

  const toggleContiene = (idAlergeno) => {
    setTrazasIds((prev) => prev.filter((id) => id !== idAlergeno));
    setContieneIds((prev) =>
      prev.includes(idAlergeno)
        ? prev.filter((id) => id !== idAlergeno)
        : [...prev, idAlergeno]
    );
  };

  const toggleTraza = (idAlergeno) => {
    setContieneIds((prev) => prev.filter((id) => id !== idAlergeno));
    setTrazasIds((prev) =>
      prev.includes(idAlergeno)
        ? prev.filter((id) => id !== idAlergeno)
        : [...prev, idAlergeno]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!usuario?.idUsuario) {
      setError('Debes iniciar sesión para guardar o editar alimentos.');
      return;
    }

    if (!nombre.trim() || !categoriaId) {
      setError('El nombre y la categoría son obligatorios.');
      return;
    }

    setGuardando(true);

    const nombresContiene = alergenosDisponibles
      .filter((a) => contieneIds.includes(a.idAlergeno))
      .map((a) => a.nombre);
    const nombresTrazas = alergenosDisponibles
      .filter((a) => trazasIds.includes(a.idAlergeno))
      .map((a) => a.nombre);

    let textoIngredientes = ingredientes.trim();
    if (!textoIngredientes && (nombresContiene.length > 0 || nombresTrazas.length > 0)) {
      const partes = [];
      if (nombresContiene.length > 0) partes.push(`Contiene: ${nombresContiene.join(', ')}`);
      if (nombresTrazas.length > 0) partes.push(`Trazas: ${nombresTrazas.join(', ')}`);
      textoIngredientes = partes.join('. ');
    }

    const payload = {
      nombre: nombre.trim(),
      marca: marca.trim() || null,
      calorias: calorias !== '' ? Number(calorias) : null,
      codigoBarras: codigoBarras.trim() || null,
      ingredientes: textoIngredientes || null,
      usuario: { idUsuario: usuario.idUsuario },
      categoria: { idCategoria: Number(categoriaId) }
    };

    try {
      const url = esEdicion
        ? `${API_URL}/alimento/${alimentoEditar.idAlimento}`
        : `${API_URL}/alimento/guardar`;

      const response = await fetch(url, {
        method: esEdicion ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || 'No se pudo guardar el alimento en el servidor.');
      }

      navigate(esEdicion ? '/ajustes' : '/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F7FC] dark:bg-black font-inter transition-colors">
      <header className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Volver atrás"
            className="p-1 -ml-1 rounded-full hover:bg-slate-200 dark:hover:bg-[#142146] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-[#F8F8FF]" />
          </button>
          <span className="font-semibold text-slate-800 dark:text-[#F8F8FF] text-base">
            {esEdicion ? 'Editar alimento' : 'Nuevo alimento'}
          </span>
        </div>

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

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 pb-12">
        <section className="mb-6 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8F8FF]">
            {esEdicion ? `Editando ${alimentoEditar.nombre}` : 'Añade a tu despensa.'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#C5D3FF]">
            Registra la información tal como aparece en el envase. * Campos obligatorios
          </p>
        </section>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
                Nombre del alimento *
              </label>
              <input
                type="text"
                required
                maxLength={50}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Galletas de avena"
                className="w-full rounded-xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 px-4 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
                Marca *
              </label>
              <input
                type="text"
                required
                maxLength={50}
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Ej. Campo Claro"
                className="w-full rounded-xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 px-4 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
                Categoría *
              </label>
              <div className="relative">
                <select
                  required
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 pl-4 pr-10 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
                >
                  {categorias.map((cat) => (
                    <option key={cat.idCategoria} value={cat.idCategoria}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 dark:text-[#C5D3FF] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
                Imagen <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <div className="w-full rounded-xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] p-1 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Subir archivo"
                  className="p-2 rounded-xl text-[#1D4ED8] dark:text-[#C5D3FF] hover:bg-slate-100 dark:hover:bg-black transition-colors cursor-pointer shrink-0"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
                Calorías (kcal)
              </label>
              <input
                type="number"
                min="0"
                value={calorias}
                onChange={(e) => setCalorias(e.target.value)}
                placeholder="Ej. 430"
                className="w-full rounded-xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 px-4 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
                Código de barras 
                <span className="text-slate-400 font-normal"> (opcional)</span>
              </label> 
              <input
                type="text"
                maxLength={50}
                value={codigoBarras}
                onChange={(e) => setCodigoBarras(e.target.value)}
                placeholder="Ej. 8412345678901"
                className="w-full rounded-xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 px-4 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>
          </div>


          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
              Ingredientes
            </label>
            <textarea
              rows={3}
              value={ingredientes}
              onChange={(e) => setIngredientes(e.target.value)}
              placeholder="Ej. Copos de avena (gluten), leche desnatada en polvo, azúcar de caña..."
              className="w-full rounded-xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 px-4 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
            />
          </div>


          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
                Alérgenos
              </label>
              <button
                type="button"
                onClick={() => setMostrarSelectorAlergenos(!mostrarSelectorAlergenos)}
                className="text-xs font-semibold text-[#1D4ED8] dark:text-[#C5D3FF] cursor-pointer"
              >
                {mostrarSelectorAlergenos ? 'Ocultar lista' : 'Ver los 14'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="rounded-2xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-[#F8F8FF]">
                  <AlertCircle className="w-4 h-4 text-[#1D4ED8] dark:text-[#C5D3FF]" />
                  <span className="font-semibold">Contiene</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {alergenosDisponibles
                    .filter((a) => contieneIds.includes(a.idAlergeno))
                    .map((al) => (
                      <button
                        key={al.idAlergeno}
                        type="button"
                        onClick={() => toggleContiene(al.idAlergeno)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-black text-[#1D4ED8] dark:text-[#C5D3FF] text-xs font-semibold cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> {al.nombre}
                      </button>
                    ))}
                  <button
                    type="button"
                    onClick={() => setMostrarSelectorAlergenos(true)}
                    aria-label="Añadir alérgeno"
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-black text-slate-600 dark:text-[#C5D3FF] hover:bg-slate-200 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-[#F8F8FF]">
                  <span className="w-4 h-4 rounded-full border-2 border-dashed border-slate-400 dark:border-[#C5D3FF] inline-block" />
                  <span className="font-semibold">Puede contener trazas</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {alergenosDisponibles
                    .filter((a) => trazasIds.includes(a.idAlergeno))
                    .map((al) => (
                      <button
                        key={al.idAlergeno}
                        type="button"
                        onClick={() => toggleTraza(al.idAlergeno)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black text-slate-800 dark:text-[#F8F8FF] text-xs font-semibold cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> {al.nombre}
                      </button>
                    ))}
                  <button
                    type="button"
                    onClick={() => setMostrarSelectorAlergenos(true)}
                    aria-label="Añadir traza"
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-black text-slate-600 dark:text-[#C5D3FF] hover:bg-slate-200 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {mostrarSelectorAlergenos && (
              <div className="rounded-2xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-700 dark:text-[#F8F8FF]">
                    Selecciona alérgenos (Contiene / Traza):
                  </p>
                  <button
                    type="button"
                    onClick={() => setMostrarSelectorAlergenos(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {alergenosDisponibles.map((al) => {
                    const esContiene = contieneIds.includes(al.idAlergeno);
                    const esTraza = trazasIds.includes(al.idAlergeno);
                    return (
                      <div
                        key={al.idAlergeno}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-black text-xs"
                      >
                        <span className="font-medium text-slate-800 dark:text-[#F8F8FF]">
                          {al.nombre}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleContiene(al.idAlergeno)}
                            className={`px-2 py-1 rounded-lg font-semibold cursor-pointer ${esContiene
                                ? 'bg-[#1D4ED8] text-white'
                                : 'bg-white dark:bg-[#142146] text-slate-600 dark:text-[#C5D3FF]'
                              }`}
                          >
                            Contiene
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleTraza(al.idAlergeno)}
                            className={`px-2 py-1 rounded-lg font-semibold cursor-pointer ${esTraza
                                ? 'bg-slate-800 text-white dark:bg-blue-900'
                                : 'bg-white dark:bg-[#142146] text-slate-600 dark:text-[#C5D3FF]'
                              }`}
                          >
                            Traza
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/70 dark:bg-[#142146] text-blue-600 dark:text-[#C5D3FF] text-xs">
            <Info className="w-4 h-4 shrink-0" />
            <p>Comprueba siempre el etiquetado del envase. La información puede cambiar.</p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] text-[#1D4ED8] dark:text-[#C5D3FF] font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando}
              className="flex-1 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {guardando
                ? 'Guardando...'
                : esEdicion
                  ? 'Guardar cambios'
                  : 'Guardar alimento'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}