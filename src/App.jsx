import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';

const Home = lazy(() => import('./pages/Home'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AddFood = lazy(() => import('./pages/AddFood'));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#1E1E1E] text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Suspense fallback={<div className="p-6 text-center text-sm">Cargando...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/ajustes" element={<Settings />} />
              <Route path="/nuevo-alimento" element={<AddFood />} />
              <Route path="/ayuda" element={<div className="p-6"><Header />Página de Ayuda</div>} />
              <Route path="*" element={<div className="p-6">Error 404: Ruta no encontrada</div>} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;