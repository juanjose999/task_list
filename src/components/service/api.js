const link = "https://task-list-2qhv.onrender.com";

export const deleteCard = async (idNote) => {
    try{
        console.log("voy a buscar : ", idNote)
        const response = await fetch(`${link}/v1/tasks/id/${idNote}`, {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("refresh")}`
            },
            mode: "cors"

        })
        if(!response.ok){
            throw new Error(`Error : ${response.status}`)
        }
        console.log("la nota que encontre fue eliminada correctamente: ")
        return true;
    }catch(error){
        console.log("error al obtener las notas : ", error)
        return false;
    }
}

export const saveNote = async (formSaveNote) => {
    try{
        const response = await fetch(`${link}/v1/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ localStorage.getItem("refresh")}`
            },
            body: JSON.stringify(formSaveNote),
            mode: "cors"
        })
        if(!response.ok){
            throw new Error(`error : ${response.status} - ${response.statusText}`)
        }
        const data = await response.json()
        console.log("se registro la nota correctamente : ", data)
        return data;
    }catch(error){
        console.log("Error", error)
        return null;
    }
}

export const getAllNoteForUser = async () => {
    try{
        const response = await fetch(`${link}/v1/tasks`, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("refresh")}`
            },
            mode: "cors"

        })
        if(!response.ok){
            throw new Error(`Error : ${response.status}`)
        }
        const data = await response.json()
        return data;
    }catch(error){
        console.log("error al obtener las notas : ", error)
        return null;
    }
}

export const updateNoteById = async (task, id) => {
    try {
        console.log("tarea: ", task)
        console.log("Id: ",id)
        const response = await fetch(`${link}/v1/tasks/id/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("refresh")}`
            },
            body: JSON.stringify(task),
            mode: "cors"
        });

        if (response.status === 401) {
            console.error("Error 401: No autorizado. Token inválido o expirado.");
            alert("Tu sesión ha expirado, por favor vuelve a iniciar sesión.");
            return;
        }

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Nota actualizada correctamente:", data);
        return data;

    } catch (error) {
        console.error("Error al actualizar la nota:", error);
        return null;
    }
};

export const buscarNotaPorNombre = async () => {
    try{
        console.log("voy a buscar : ", buscarNota)
        const response = await fetch(`${link}/v1/tasks/search?name=${buscarNota}`, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("refresh")}`
            },
            mode: "cors"

        })
        if(!response.ok){
            throw new Error(`Error : ${response.status}`)
        }
        const data = await response.json()
        console.log("la nota que encontre fue: ", data)
        return data
    }catch(error){
        console.log("error al obtener las notas : ", error)
        return null;
    }
}


export const logout = async () => {
    try{
      const response = await fetch(`https://task-list-2qhv.onrender.com/v1/users/logout`, {
          method:"POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("refresh")}`
          },
          mode: "cors"

      })
      if(!response.ok){
          throw new Error(`Error : ${response.status}`)
      }
      console.log("Saliste correctamente")
      }catch(error){
          console.log("error al salir : ", error)
      }
    }