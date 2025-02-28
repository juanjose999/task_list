import { useEffect, useState, useMemo } from "react";
import { NewNote } from "./FormNewNote";
import { Note } from "./Note";
import "./dashboar.css";
import btnExit from "../../assets/component.png";
import {
  deleteCard,
  getAllNoteForUser,
  saveNote,
  updateNoteById,
} from "../service/api";

export const DashBoard = ({ tokens, salir }) => {
  const { refresh_token, access_token } = tokens;

  const [allNotes, setAllNotes] = useState([]);
  const [formSaveNote, setFormSaveNote] = useState({});
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [buscarNota, setBuscarNota] = useState("");
  const [sinRealizar, setSinRealizar] = useState([]);
  const [enProceso, setEnProceso] = useState([]);
  const [realizadas, setRealizadas] = useState([]);
  const [currentBtnFilter, setCurrentBtnFilter] = useState("sin_realizar");

  const filterNotesSinRealizar = () => {
    setSinRealizar(allNotes.filter((n) => n.status === "sin_realizar"));
  };

  const filterNotesEnProceso = () => {
    setEnProceso(allNotes.filter((n) => n.status === "en_proceso"));
  };

  const filterNotesRealizadas = () => {
    setRealizadas(allNotes.filter((n) => n.status === "realizada"));
  };

  const saveNewNote = async (formSaveNote) => {
    const newNote = await saveNote(formSaveNote);
    if (newNote) {
      console.log("se guardo la nota correctamente : ", newNote);
      setAllNotes((allNotes) => [...allNotes, newNote]);
      setFilteredNotes(sinRealizar);
    } else {
      console.log("Error no se pudo guardar la nota.");
    }
  };

  const allNotesByUserToken = async () => {
    const allNotesByUser = await getAllNoteForUser();
    if (allNotesByUser) {
      setAllNotes(allNotesByUser);
      const notasSinRealizar = allNotesByUser.filter(
        (n) => n.status === "sin_realizar"
      );
      setSinRealizar(notasSinRealizar);
      setFilteredNotes(notasSinRealizar);
    } else {
      console.log("Error en traer todas la notas de usuario.");
    }
  };

  const buscarNotaPorNombre = () => {
    if (buscarNota.trim() === "") {
      setFilteredNotes(allNotes);
    } else {
      const notas = allNotes.filter((nota) =>
        nota.title.toLowerCase().includes(buscarNota.toLowerCase())
      );
      setFilteredNotes(notas);
    }
  };

  useEffect(() => {
    filterNotesSinRealizar();
    filterNotesEnProceso();
    filterNotesRealizadas();
    console.log("filtradas sin realizar = ", sinRealizar);
    console.log("filtradas en proceso: ", enProceso);
    console.log("filtradas realizadas : ", realizadas);
  }, [allNotes]);

  useEffect(() => {
    console.log(tokens);
    localStorage.setItem("refresh", refresh_token);
    allNotesByUserToken();
  }, [formSaveNote]);

  useEffect(() => {
    if (buscarNota.trim() === "") {
      setFilteredNotes(sinRealizar);
    } else {
      buscarNotaPorNombre();
    }
  }, [buscarNota, allNotes]);

  const deleteCardById = async (idNote) => {
    const isDeleted = await deleteCard(idNote);
    if (isDeleted) {
      setAllNotes((allNotes) => allNotes.filter((note) => note.id != idNote));
    } else {
      console.log("No se pudo eliminar la nota.");
    }
  };

  const updateNote = async (task, id) => {
    const updateNote = await updateNoteById(task, id);
    if (updateNote) {
      console.log("Se actualizo la nota correctamente");
      setAllNotes((allNotes) =>
        allNotes.map((note) => (note.id === id ? { ...note, ...task } : note))
      );
    } else {
      console.log("Error no se pudo actualizar la nota.");
    }
  };

  return (
    <>
      <header>
        <div>
          <input
            type="text"
            placeholder="Buscar tareas pot titulo"
            value={buscarNota}
            onChange={(e) => setBuscarNota(e.target.value)}
          />
        </div>
        <button className="btn-salir" onClick={salir}>
          <img src={btnExit} alt="" srcset="" />
        </button>
      </header>

      <div className="container_dashboar">
        <NewNote className="saveNote" sendNewNote={saveNewNote} />

        <div className="container-allNote">
          <div className="btns_filter">
            <button
              className={`btn_filter ${
                currentBtnFilter === "sin_realizar" ? "active" : ""
              }`}
              onClick={() => {
                setFilteredNotes(sinRealizar);
                setCurrentBtnFilter("sin_realizar")
              }}
            >
              Sin realizar
            </button>

            <button
              className={`btn_filter ${
                currentBtnFilter === "en_proceso" ? "active" : ""
              }`}
              onClick={() => {
                setFilteredNotes(enProceso);
                setCurrentBtnFilter("en_proceso")
              }}
            >
              En proceso
            </button>

            <button
              className={`btn_filter ${
                currentBtnFilter === "realizada" ? "active" : ""
              }`}
              onClick={() => {
                setFilteredNotes(realizadas);
                setCurrentBtnFilter("realizada")
              }}
            >
              Realizadas
            </button>
          </div>

          {filteredNotes.length > 0 ? (
            filteredNotes.map((n) => (
              <Note
                key={n.id}
                id={n.id}
                title={n.title}
                description={n.description}
                priority={n.priority}
                status={n.status}
                updateNote={updateNote}
                deleteById={deleteCardById}
              />
            ))
          ) : (
            <p>No se encontraron notas.</p>
          )}
        </div>
      </div>
    </>
  );
};
