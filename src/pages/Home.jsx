
import Header from '../components/Header';

export default function Home() {


  return (
    <div className="min-h-screen flex flex-col bg-[#F3F7FC] font-inter">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-start text-left space-y-2 max-w-lg">
            <p className="text-2xl font-semibold text-blue-600">
              Tu despensa, más clara
            </p>
            <h3 className="text-3xl text-[#0F172A] font-bold">
              Conoce lo que comes
            </h3>
            <p className="text-base text-[#61738A]">
              Consulta alimentos y revisa sus alérgenos.
            </p>

            <div className="relative w-full max-w-md pt-4">
              <span className="pointer-events-none absolute left-0 flex items-center pl-3 pt-3 text-[#1D4ED8]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Buscar productos o ingredientes..."
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>

            <div className="flex flex-col gap-2.5 w-full max-w-md">
              <div className="flex items-center gap-3 w-full">
                <button
                  type="button"
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-300 bg-white hover:bg-blue-100 px-4 py-2.5 text-sm font-normal text-slate-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8v8m10-5v5M3 12h18M3 20h18" />
                    </svg>
                    Alérgenos
                  </span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="relative flex-1">
                  <select
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    defaultValue="default"
                  >
                    <option value="default">Categoría</option>
                    <option value="galletas">Galletas</option>
                    <option value="lacteos">Lácteos</option>
                    <option value="panaderia">Panadería</option>
                    <option value="bebidas">Bebidas</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#61738A]">
                <svg className="h-4 w-4 shrink-0 text-[#61738A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>
                  Destacando tus alergias: <strong className="font-medium text-slate-700">leche y frutos de cáscara</strong>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-left text-left md:items-center md:text-center space-y-2 max-w-lg px-7.5">
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-base font-normal text-[#0F172A]">
                Resultados
              </p>
              <p className="text-xs font-normal text-[#1D4ED8]">
                2 alimentos
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}