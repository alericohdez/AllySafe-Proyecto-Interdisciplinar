const API_URL = 'http://localhost:8080/api';


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
