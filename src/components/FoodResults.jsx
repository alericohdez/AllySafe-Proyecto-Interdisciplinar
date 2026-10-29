export default function FoodResults({ filtered = [], selectedId = null, selectedItem = null, onToggle }) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md font-inter">
      <div className="flex justify-between items-center px-1">
        <h4 className="text-base font-semibold text-slate-900">Resultados</h4>
        <span className="text-xs font-semibold text-blue-600">
          {filtered.length} {filtered.length === 1 ? 'alimento' : 'alimentos'}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            isOpen={item.id === selectedId}
            onToggle={() => onToggle && onToggle(item.id)}
          />
        ))}
      </div>

      {selectedItem && <ItemDetail item={selectedItem} />}
    </div>
  );
}

function ItemCard({ item, isOpen, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-3 rounded-2xl bg-white border text-left transition-all ${
        isOpen ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <img src={item.imagen} alt={item.nombre} className="h-12 w-12 rounded-xl object-cover" />
        <div>
          <p className="text-sm font-semibold text-slate-900">{item.nombre}</p>
          <p className="text-xs text-slate-500">{item.marca} · {item.peso}</p>
          <p className="text-xs font-medium text-blue-600">! Contiene {item.alergenos.join(' y ').toLowerCase()}</p>
        </div>
      </div>
      <span className={`text-blue-600 text-xs font-bold transition-transform ${isOpen ? 'rotate-180' : ''}`}>
        ▼
      </span>
    </button>
  );
}

function ItemDetail({ item }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3">
      <div className="flex items-center gap-3">
        <img src={item.imagen} alt={item.nombre} className="h-16 w-16 rounded-xl object-cover" />
        <div>
          <span className="text-[10px] font-bold text-blue-600 tracking-wider">{item.categoriaLabel}</span>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.nombre}</h3>
          <p className="text-xs text-slate-500">{item.marca} · {item.peso}</p>
        </div>
      </div>

      <div className="space-y-2 border-t border-slate-100 pt-2 text-xs">
        <div>
          <span className="text-slate-500 font-medium block mb-1">Contiene</span>
          <div className="flex flex-wrap gap-1.5">
            {item.alergenos.map(al => (
              <span key={al} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 font-semibold">
                ℹ️ {al}
              </span>
            ))}
          </div>
        </div>

        {item.trazas && item.trazas.length > 0 && (
          <div>
            <span className="text-slate-500 font-medium block mb-1">Puede contener trazas</span>
            <div className="flex flex-wrap gap-1.5">
              {item.trazas.map(tr => (
                <span key={tr} className="px-2.5 py-1 rounded-lg border border-blue-200 text-blue-600 font-semibold">
                  ⚠️ {tr}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}