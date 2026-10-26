import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#1E1E1E] text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ajustes" element={<Settings />} />
            <Route path="/login" element={<div className="p-6">Página de Login (en construcción)</div>} />
            <Route path="/nuevo-alimento" element={<div className="p-6">Nuevo Alimento (en construcción)</div>} />
            <Route path="/ayuda" element={<div className="p-6">Página de Ayuda (en construcción)</div>} />
            <Route path="*" element={<div className="p-6">Error 404: Ruta no encontrada</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;