import { useState } from "react";
import "./newNote.css";

export const NewNote = ({ sendNewNote }) => {
  const [formSendNewNote, setFormSendNewNote] = useState({
    title: "",
    description: "",
    priority: "",
    status:"SIN_REALIZAR"
  });
  const [prioridad, setPrioridad] = useState("")

  const handlePriorityChange = (tipoDePrioridad) => {
    setFormSendNewNote((prevState) => ({
      ...prevState,
      priority: tipoDePrioridad,
    }));
  };

  const handleChange = (e) => {
    setFormSendNewNote({
      ...formSendNewNote,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendNewNote(formSendNewNote);    
    setFormSendNewNote({
      title: "",
      description: "",
      priority: "",
      status: "SIN_REALIZAR"
    });
  };

  return (
    <div className="container_new_note">
      <form onSubmit={handleSubmit} className="form_container">
        <input
          type="text"
          name="title"
          placeholder="Ingrese el título"
          value={formSendNewNote.title}
          required
          onChange={handleChange} // Usa la función genérica
        />

        <textarea
          name="description"
          placeholder="Ingrese la descripción"
          required
          value={formSendNewNote.description}
          onChange={handleChange} // Usa la función genérica
        />

        <div className="container-prioridad">
          <span>prioridad</span>

          <button
          type="button"
          className={formSendNewNote.priority === "ALTA" ? "activeAlta" : ""}
           onClick={() => {
            console.log(prioridad)
            setPrioridad("ALTA")
            handlePriorityChange("ALTA")
          }}>Alta
          </button>

          <button
          type="button"
          className={formSendNewNote.priority === "BAJA" ? "activeBaja" : ""}
          onClick={() => {
            setPrioridad("BAJA")
            handlePriorityChange("BAJA")
          }}>Baja
          </button>

        </div>

        <button type="submit" className="btn_guardar">Guardar</button>
      </form>
    </div>
  );
};
