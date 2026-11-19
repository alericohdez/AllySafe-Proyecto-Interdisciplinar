const API_URL = 'http://localhost:8080/api';

const obtenerToken = () => {
  const sesion = JSON.parse(sessionStorage.getItem('usuarioAllySafe'));
  return sesion?.token || null;
};

export const fetchConToken = async (endpoint, opciones = {}) => {
  const token = obtenerToken();

  const headers = {
    'Content-Type': 'application/json',
    ...opciones.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...opciones,
    headers,
  });

  if (res.status === 401 || res.status === 403) {
    sessionStorage.removeItem('usuarioAllySafe');
    window.location.href = '/login';
    throw new Error('Sesión expirada o no autorizada.');
  }

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await res.json();
  }
  return await res.text();
};

export const registrarUsuario = async (datosUsuario) => {
  const res = await fetch(`${API_URL}/usuarios/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosUsuario)
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const loginUsuario = async (credenciales) => {
  const res = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credenciales)
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const obtenerAlimentos = async () => {
  const response = await fetch(`${API_URL}/alimento/listar`);
  if (!response.ok) throw new Error('Error al cargar los alimentos del servidor.');
  return await response.json();
};

export const obtenerCategorias = async () => {
  const response = await fetch(`${API_URL}/categoria/listar`);
  if (!response.ok) throw new Error('Error al cargar las categorías.');
  return await response.json();
};

export const obtenerAlergenos = async () => {
  const response = await fetch(`${API_URL}/alergeno/listar`);
  if (!response.ok) throw new Error('Error al cargar los alérgenos.');
  return await response.json();
};

export const eliminarAlimento = async (id) => {
  const response = await fetch(`${API_URL}/alimento/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('No se pudo eliminar el alimento.');
};