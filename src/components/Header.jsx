import { Link, useNavigate } from 'react-router-dom';
import { Leaf, HelpCircle, SlidersHorizontal, ArrowLeft, WifiOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header({ showBack = false, title = '' }) {
  const navigate = useNavigate();
  const { isOnline, setIsOnline } = useTheme();

  return (
    <header className="w-full font-inter">
      {!isOnline && (
        <div
          role="alert"
          className="bg-red-600 text-white text-xs font-medium px-4 py-2 flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 shrink-0" />
            Sin conexión. Mostrando datos guardados en tu despensa local.
          </span>
          <button
            onClick={() => setIsOnline(true)}
            className="underline font-semibold ml-2 cursor-pointer"
          >
            Reconectar
          </button>
        </div>
      )}

      <nav
        aria-label="Navegación principal"
        className="max-w-5xl mx-auto px-4 pt-5 pb-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              aria-label="Volver atrás"
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#142146] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-[#F8F8FF]" />
            </button>
          ) : (
            <Link
              to="/"
              aria-label="Ir al inicio de AllySafe"
              className="w-9 h-9 rounded-xl bg-[#1D4ED8] flex items-center justify-center text-[#F8F8FF] shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Leaf className="w-5 h-5" />
            </Link>
          )}
          {title && (
            <span className="font-semibold text-slate-800 dark:text-[#F8F8FF] text-base">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/ayuda"
            aria-label="Abrir página de ayuda"
            className="p-2 rounded-full text-slate-700 dark:text-[#C5D3FF] hover:bg-slate-200 dark:hover:bg-[#142146] transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </Link>
          <Link
            to="/ajustes"
            aria-label="Abrir ajustes y preferencias"
            className="p-2 rounded-full text-slate-700 dark:text-[#C5D3FF] hover:bg-slate-200 dark:hover:bg-[#142146] transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}