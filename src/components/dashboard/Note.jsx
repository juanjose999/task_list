import { useEffect, useState } from "react";
import "./note.css";
import TextareaAutosize from "react-textarea-autosize";
import garbaje from "../../assets/basura.png"

export const Note = ({ id, title, description, priority, status, updateNote, deleteById}) => {
  const [isViewBtn, setIsViewBtn] = useState(false);
  const [text, setText] = useState(description);
  const [titulo, setTitulo] = useState(title);
  const [prioridadEstado, setPrioridadEstado] = useState("");
  const [estado, setEstado] = useState("");

  // ✅ Sincroniza prioridad y estado al montar el componente
  useEffect(() => {
    setPrioridadEstado(priority?.toLowerCase()); 
    setEstado(status?.toLowerCase());
    console.log("Prioridad inicial:", priority, "Estado inicial:", status);
  }, [priority, status]);

  // ✅ Ver cambios en prioridad y estado
  useEffect(() => {
    console.log("enviar para actualizar: ", { titulo, text, prioridadEstado, estado });
  }, [isViewBtn, prioridadEstado, estado]);

  const capitalizetLetter = (str) => {
    if (!str) return ""; 
    return str.toUpperCase()
  };
  

  return (
    <>
      <div className="container_card" onClick={() => setIsViewBtn(true)}>
        <div className="content">
          <button className="salir"
            onClick={() => deleteById(id)}>
            <img src={garbaje} alt="" />
          </button>
          <input
            className="card_input"
            type="text"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              setIsViewBtn(true);
            }}
          />
          <TextareaAutosize
            className="card_textarea"
            value={text}
            minRows={1}
            maxRows={16}
            onChange={(e) => {
              setText(e.target.value);
              setIsViewBtn(true);
            }}
          />

          {/* ✅ Botones de prioridad */}
          <div className="prioridad">
            <span>Urgencia</span>
            <button 
              className={`btn_prioridad_is ${prioridadEstado === "alta" ? "active" : ""}`}
              onClick={() => {
                setPrioridadEstado("alta");
                setIsViewBtn(true);
              }}
            >
              Alta
            </button>
            <button 
              className={`btn_prioridad_is ${prioridadEstado === "baja" ? "active" : ""}`}
              onClick={() => {
                setPrioridadEstado("baja"); 
                setIsViewBtn(true);
              }}
            >
              Baja
            </button>
          </div>

          {/* ✅ Botones de estado corregidos */}
          <div className="container_status">
            <div className="container_status_btns">

              <button
                className={`btn_prioridad_is ${estado === "sin_realizar" ? "active" : ""}`}
                onClick={() => {
                  setEstado("sin_realizar");
                  setIsViewBtn(true);
                }}
              >
                Sin terminar
              </button>

              <button
                className={`btn_prioridad_is ${estado === "en_proceso" ? "activeProceso": ""}`}
                onClick={() => {
                  setEstado("en_proceso");
                  setIsViewBtn(true)
                }}>
                En proceso
              </button>

              <button
                className={`btn_prioridad_is ${estado === "realizada" ? "activeTerminada" : ""}`}
                onClick={() => {
                  setEstado("realizada");
                  setIsViewBtn(true);
                }}
              >
                Terminada
              </button>

            </div>
          </div>

          {isViewBtn && (
            <button
              className="saveBtn"
              onClick={() => {
                console.log("Guardado:", { titulo, text, prioridad: prioridadEstado, estado });
                setIsViewBtn(false);
                updateNote(
                  {
                    title:titulo,
                    description:text,
                    priority: capitalizetLetter(prioridadEstado),
                    status: capitalizetLetter(estado)
                  },
                  id
                );
              }}
            >
              Guardar
            </button>
          )}
        </div>
      </div>
    </>
  );
};
