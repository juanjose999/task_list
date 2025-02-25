import { useState } from "react";
import "./login.css";

export const FormLogin = ({ onLogin, onPage }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Datos antes de enviar:", form); // Verifica si el estado está vacío

    if (!form.email || !form.password) {
      alert("⚠️ Por favor, llena todos los campos.");
      return;
    }

    onLogin(form); // Enviar los datos al AuthContainer
  };

  return (
    <div className="container">
      <form className="form_container" onSubmit={handleSubmit}>
        <h2>Inicie sesión</h2>

        <div>
          <label htmlFor="email">Ingrese su email</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Ingrese su contraseña</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <div>
          <button type="submit">Iniciar sesión</button>
        </div>

        <hr />

        <div>
          <button
            className="ir_login"
            type="button"
            onClick={() => onPage("signup")}
          >
            Regístrese acá
          </button>
        </div>
      </form>
    </div>
  );
};
