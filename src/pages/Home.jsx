import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F7FC] dark:bg-black font-inter transition-colors">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-4">
            <p className="text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-[#C5D3FF]">
              Tu despensa, más clara
            </p>
            <h1 className="text-3xl sm:text-4xl text-[#0F172A] dark:text-[#F8F8FF] font-extrabold leading-tight">
              Conoce lo que comes
            </h1>
            <p className="text-base sm:text-lg text-[#61738A] dark:text-[#C5D3FF]">
              Consulta alimentos y revisa sus alérgenos.
            </p>

            <div className="relative w-full pt-2">
              <span className="pointer-events-none absolute left-0 flex items-center pl-3 pt-3 text-[#1D4ED8]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Buscar productos o ingredientes..."
                className="w-full rounded-xl border border-slate-300 dark:border-[#142146] bg-white dark:bg-[#142146] py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-[#F8F8FF] placeholder:text-slate-400 dark:placeholder:text-[#C5D3FF]/60 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition-all shadow-xs"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-row sm:grid-cols-2 gap-3 w-full">
                <div className="relative w-full">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-700 dark:text-[#C5D3FF]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8v8m10-5v5M3 12h18M3 20h18" />
                    </svg>
                  </span>
                  <select
                    className="w-full appearance-none rounded-xl border border-slate-300 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 pl-9 pr-10 text-sm font-medium text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none shadow-xs"
                  >
                    <option value="default">Alérgenos</option>
                    <option value="gluten">Gluten</option>
                    <option value="leche">Leche</option>
                    <option value="frutos de cascara">Frutos de cáscara</option>
                    <option value="soja">Soja</option>
                    <option value="huevos">Huevos</option>
                    <option value="pescado">Pescado</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-700 dark:text-[#C5D3FF]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>

                <div className="relative w-full">
                  <select
                    className="w-full appearance-none rounded-xl border border-slate-300 dark:border-[#142146] bg-white dark:bg-[#142146] py-2.5 pl-4 pr-10 text-sm font-medium text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none shadow-xs"
                  >
                    <option value="default">Categoría</option>
                    <option value="galletas">Galletas</option>
                    <option value="lacteos">Lácteos</option>
                    <option value="panaderia">Panadería</option>
                    <option value="bebidas">Bebidas</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-700 dark:text-[#C5D3FF]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
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
            </div>

            <div className="w-full space-y-3 pt-2">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-[#142146] text-blue-600 dark:text-[#C5D3FF] text-xs">
                <span>ℹ️</span>
                <p>Comprueba siempre el etiquetado del envase. La información puede cambiar.</p>
              </div>

              <button 
                type="button" 
                className="relative w-full py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-[#F8F8FF] font-semibold text-sm transition-colors shadow-sm"
              >
                <Link 
                  to="/nuevo-alimento" 
                  className="absolute inset-0" 
                  aria-label="Ir a la página de añadir alimento"
                />
                + Añadir alimento
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}