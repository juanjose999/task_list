import { useEffect, useState } from "react"
import { NewNote } from "./FormNewNote"
import { Note } from "./Note"
import "./dashboar.css"
import btnExit from "../../assets/component.png"
import { deleteCard, getAllNoteForUser, saveNote, updateNoteById } from "../service/api"

export const DashBoard = ({tokens, salir}) => {

    const { refresh_token, access_token } = tokens;
    
    const [allNotes, setAllNotes] = useState([])
    const [formSaveNote, setFormSaveNote] = useState({})
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [buscarNota, setBuscarNota] = useState("")


    const saveNewNote = async (formSaveNote) => {
        const newNote = await saveNote(formSaveNote);
        if(newNote) {
            console.log("se guardo la nota correctamente : ", newNote)
            setAllNotes((allNotes) => [...allNotes, newNote]);
            setFilteredNotes(allNotes)
        }else {
            console.log("Error no se pudo guardar la nota.")
        }
    }

    const allNotesByUserToken = async () => {
        const allNotesByUser = await getAllNoteForUser();
        if(allNotesByUser) {
            setAllNotes(allNotesByUser)
            setFilteredNotes(allNotesByUser)
            console.log("Se encontraron notas de usuario.");
        }else {
            console.log("Error en traer todas la notas de usuario.");
        }
    }

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
        console.log(tokens)
        localStorage.setItem("refresh", refresh_token)
        allNotesByUserToken();
        saveNote(formSaveNote)
        console.log("all notes desde dashboarCon :", allNotes)
        console.log(refresh_token)

    }, [formSaveNote])

    useEffect(() => {
        if(buscarNota.trim() === ""){
            setFilteredNotes(allNotes)
        }else{
            buscarNotaPorNombre();
        }
    }, [buscarNota, allNotes])

    const deleteCardById = async (idNote) => {
        const isDeleted = await deleteCard(idNote);
        if(isDeleted) {
            setAllNotes((allNotes) => allNotes.filter(note => note.id != idNote))
        }
        else {
            console.log("No se pudo eliminar la nota.")
        }
    }


    const updateNote = async (task, id) => {
        const updateNote = await updateNoteById(task, id);
        if(updateNote){
            console.log("Se actualizo la nota correctamente")
            setAllNotes((allNotes) => 
                allNotes.map((note) => (note.id === id ? {...note, ...task} : note))
            );
        }else{
            console.log("Error no se pudo actualizar la nota.")
        }
    };
    


    return <>
        <header>
            <div>
                <input type="text" 
                placeholder="Buscar tareas pot titulo"
                value={buscarNota}
                onChange={(e) => setBuscarNota(e.target.value)} 
                />
            </div>
            <button className="btn-salir" onClick={salir}><img src={btnExit} alt="" srcset="" /></button>
        </header>

        <div className="container_dashboar">
            
        <NewNote sendNewNote={saveNewNote} />

        <div className="container-allNote">
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

}