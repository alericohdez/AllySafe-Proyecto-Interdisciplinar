import { Trash2, PackageOpen } from 'lucide-react';

export default function FoodResults({
  filtered = [],
  selectedId = null,
  onToggle,
  usuarioLogueado,
  onEliminar,
  onRestablecerFiltros
}) {
  const selectedItem = filtered.find((item) => item.idAlimento === selectedId) || null;

  return (
    <div className="flex flex-col gap-3 w-full font-inter text-left">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-[#F8F8FF]">
          Resultados
        </h2>
        <span className="text-xs font-semibold text-[#1D4ED8] dark:text-[#C5D3FF]">
          {filtered.length} {filtered.length === 1 ? 'alimento' : 'alimentos'}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-[#142146] border border-slate-200 dark:border-[#142146] p-6 text-center space-y-2.5">
          <PackageOpen className="w-8 h-8 mx-auto text-slate-400 dark:text-[#C5D3FF]" />
          <p className="text-sm font-bold text-slate-900 dark:text-[#F8F8FF]">
            No hay alimentos que coincidan con tu búsqueda
          </p>
          <p className="text-xs text-slate-500 dark:text-[#C5D3FF]">
            Prueba a quitar alguno de los filtros activos o revisa si hay errores tipográficos.
          </p>
          {onRestablecerFiltros && (
            <button
              type="button"
              onClick={onRestablecerFiltros}
              className="px-4 py-2 rounded-xl bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Mostrar todos los alimentos
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((item) => (
            <ItemCard
              key={item.idAlimento}
              item={item}
              isOpen={item.idAlimento === selectedId}
              onToggle={() => onToggle && onToggle(item.idAlimento)}
            />
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemDetail
          item={selectedItem}
          esPropietario={
            usuarioLogueado && selectedItem.usuario?.idUsuario === usuarioLogueado.idUsuario
          }
          onEliminar={onEliminar}
        />
      )}
    </div>
  );
}

function ItemCard({ item, isOpen, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#142146] border text-left transition-all cursor-pointer ${
        isOpen
          ? 'border-[#1D4ED8] ring-2 ring-blue-100 dark:ring-blue-900/40'
          : 'border-slate-200 dark:border-[#142146]'
      }`}
    >
      <div className="space-y-0.5">
        <p className="text-sm font-semibold text-slate-900 dark:text-[#F8F8FF]">
          {item.nombre}
        </p>
        <p className="text-xs text-slate-500 dark:text-[#C5D3FF]">
          {item.marca || 'Marca genérica'} · {item.categoria?.nombre || 'Sin categoría'}
          {item.calorias != null ? ` · ${item.calorias} kcal` : ''}
        </p>
      </div>
      <span
        className={`text-[#1D4ED8] dark:text-[#C5D3FF] text-xs font-bold transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`}
      >
        ▼
      </span>
    </button>
  );
}

function ItemDetail({ item, esPropietario, onEliminar }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#142146] border border-slate-200 dark:border-[#142146] p-4 space-y-3 shadow-xs">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold uppercase text-[#1D4ED8] dark:text-[#C5D3FF] tracking-wider">
            {item.categoria?.nombre || 'Alimento'}
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8F8FF] leading-tight">
            {item.nombre}
          </h3>
          <p className="text-xs text-slate-500 dark:text-[#C5D3FF]">
            {item.marca || 'Sin marca'} {item.calorias != null && `· ${item.calorias} kcal`}
          </p>
        </div>

        {esPropietario && onEliminar && (
          <button
            type="button"
            onClick={() => onEliminar(item.idAlimento)}
            aria-label={`Eliminar ${item.nombre}`}
            className="p-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-black transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-2 border-t border-slate-100 dark:border-black pt-2.5 text-xs">
        <div>
          <span className="text-slate-500 dark:text-[#C5D3FF] font-semibold block mb-1">
            Ingredientes
          </span>
          <p className="text-slate-800 dark:text-[#F8F8FF]">
            {item.ingredientes || 'No se han especificado ingredientes para este producto.'}
          </p>
        </div>

        {item.codigoBarras && (
          <p className="text-[11px] text-slate-400 dark:text-[#C5D3FF]/70">
            Código de barras: {item.codigoBarras}
          </p>
        )}
      </div>
    </div>
  );
}