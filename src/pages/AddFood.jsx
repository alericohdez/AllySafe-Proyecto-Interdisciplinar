import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, SlidersHorizontal, ChevronDown, Plus, Check, AlertCircle, Info, Upload } from 'lucide-react';

export default function AddFood() {
  const navigate = useNavigate();

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
            Nuevo alimento
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
            Añade a tu despensa.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#C5D3FF]">
            Registra la información tal como aparece en el envase. * Campos obligatorios
          </p>
        </section>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
                Nombre del alimento *
              </label>
              <input
                type="text"
                defaultValue="Galletas de avena"
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
                defaultValue="Campo Claro"
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
                  defaultValue="Galletas"
                  className="w-full appearance-none rounded-xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 pl-4 pr-10 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
                >
                  <option value="Galletas">Galletas</option>
                  <option value="Lácteos">Lácteos</option>
                  <option value="Panadería">Panadería</option>
                  <option value="Bebidas">Bebidas</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 dark:text-[#C5D3FF] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
                Imagen <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <div className="w-full rounded-2xl border-2 border-[#1D4ED8] bg-white dark:bg-[#142146] p-3 flex items-center justify-between">
                <img
                  src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&auto=format&fit=crop"
                  alt="Vista previa"
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />

                <button
                  type="button"
                  aria-label="Subir archivo"
                  className="p-2 rounded-xl text-[#1D4ED8] dark:text-[#C5D3FF] hover:bg-slate-100 dark:hover:bg-black transition-colors cursor-pointer shrink-0"
                >
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
                Alérgenos *
              </label>
              <button type="button" className="text-xs font-semibold text-[#1D4ED8] dark:text-[#C5D3FF] cursor-pointer">
                Ver los 14
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-[#F8F8FF]">
                  <AlertCircle className="w-4 h-4 text-[#1D4ED8] dark:text-[#C5D3FF]" />
                  <span className="font-semibold">Contiene</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-black text-[#1D4ED8] dark:text-[#C5D3FF] text-xs font-semibold">
                    <Check className="w-3.5 h-3.5" /> Gluten
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-black text-[#1D4ED8] dark:text-[#C5D3FF] text-xs font-semibold">
                    <Check className="w-3.5 h-3.5" /> Leche
                  </span>
                  <button type="button" className="p-1.5 rounded-xl bg-slate-100 dark:bg-black text-slate-600 dark:text-[#C5D3FF] hover:bg-slate-200 cursor-pointer">
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
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black text-slate-800 dark:text-[#F8F8FF] text-xs font-semibold">
                    <Check className="w-3.5 h-3.5" /> Frutos de cáscara
                  </span>
                  <button type="button" className="p-1.5 rounded-xl bg-slate-100 dark:bg-black text-slate-600 dark:text-[#C5D3FF] hover:bg-slate-200 cursor-pointer">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/70 dark:bg-[#142146] text-blue-600 dark:text-[#C5D3FF] text-xs">
            <Info className="w-4 h-4 shrink-0" />
            <p>Comprueba siempre el etiquetado del envase. La información puede cambiar.</p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-[#142146] bg-white dark:bg-[#142146] text-[#1D4ED8] dark:text-[#C5D3FF] font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Check className="w-4 h-4" /> Guardar alimento
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}