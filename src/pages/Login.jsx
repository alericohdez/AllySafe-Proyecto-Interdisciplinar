import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff, Info } from 'lucide-react';
import Header from '../components/Header';

export default function Login() {
  const navigate = useNavigate();


  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const response = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      if (!response.ok) {
        const mensajeError = await response.text();
        throw new Error(mensajeError || 'Credenciales incorrectas');
      }

      
      const usuarioLogueado = await response.json();

      
      localStorage.setItem('usuarioAllySafe', JSON.stringify(usuarioLogueado));

      
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F7FC] dark:bg-black font-inter transition-colors flex flex-col justify-between">
      <Header />

      <main className="flex-1 max-w-md w-full mx-auto px-4 sm:px-6 py-8 flex flex-col justify-center space-y-6">
        <section className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8F8FF] leading-tight">
            Tu alimentación, con más información.
          </h1>
          <p className="text-sm sm:text-base text-[#61738A] dark:text-[#C5D3FF]">
            Inicia sesión para guardar tus alimentos y tener tus alérgenos siempre a mano.
          </p>
        </section>

        <form 
          className="space-y-4 bg-white dark:bg-[#142146] sm:p-6 p-4 rounded-2xl border border-slate-200 dark:border-[#142146] shadow-xs" 
          onSubmit={handleLogin}
        >

          {error && (
            <div className="p-3 text-xs font-semibold text-red-700 bg-red-100 border border-red-200 rounded-xl text-center dark:bg-red-900/30 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
              Correo electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tu@correo.es"
                className="w-full rounded-xl border border-slate-200 dark:border-black bg-slate-50 dark:bg-black py-3 pl-4 pr-10 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 dark:text-[#C5D3FF] absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-[#F8F8FF]">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Contraseña"
                className="w-full rounded-xl border border-slate-200 dark:border-black bg-slate-50 dark:bg-black py-3 pl-4 pr-10 text-sm text-slate-900 dark:text-[#F8F8FF] focus:border-[#1D4ED8] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar u ocultar contraseña"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#C5D3FF] hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="text-center">
            <button type="button" className="text-xs font-semibold text-[#1D4ED8] dark:text-[#C5D3FF] cursor-pointer">
              ¿Has olvidado tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-xs disabled:opacity-50"
          >
            {cargando ? (
              <span>Cargando...</span>
            ) : (
              <>
                <span>→</span> Iniciar sesión
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500 dark:text-[#C5D3FF] pt-2">
            ¿Es tu primera vez?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/register')}
              className="font-semibold text-[#1D4ED8] dark:text-[#C5D3FF] cursor-pointer"
            >
              Regístrate
            </button>
          </p>
        </form>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/50 dark:bg-[#142146] text-slate-500 dark:text-[#C5D3FF] text-[11px]">
          <Info className="w-4 h-4 shrink-0 text-slate-400 dark:text-[#C5D3FF]" />
          <p>Consulta la información y comprueba siempre el etiquetado del envase.</p>
        </div>
      </main>
    </div>
  );
}