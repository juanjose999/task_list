import { FormSignUp } from "./registrarse"
import { FormLogin } from "./Login"
import { useState } from "react"

export const AuthContrainer = ({onLogged, onTokens}) => {

    const [formSignUp, setFormSignUp] = useState({})
    const [formLogin, setFormLogin] = useState({})
    const [currentPage, setCurrentPage] = useState("login")

    const updateFormSignUp = (form) => {
        setFormSignUp(form);
        sendRegisterData(form)
    }

    const updateFormLogin = (form) => {
        setFormLogin(form)
        sendLoginData(form)
    }

    const sendLoginData = async (form) => {
        console.log("📤 Enviando datos al servidor:", form);
        try{
            const response = await fetch("https://task-list-2qhv.onrender.com/v1/auth/login", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
                mode: "cors"
            })
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log("Incio existos:" , data);
            onTokens(data);
            localStorage.removeItem("refresh")
            localStorage.setItem("refresh", data.refresh_token);
            onLogged(true)
        }catch(error) {
            console.log("Error en registrase :", error)
        }
    }


    const sendRegisterData = async (formData) => {
        console.log("voy a enviar = ", formData)
        try {
            const response = await fetch("https://task-list-2qhv.onrender.com/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                mode: "cors"
            });
    
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log("Registro exitoso desde authcontroller:", data);
            
            // Aquí pasamos los tokens directamente desde la respuesta de la API
            onTokens(data);
            localStorage.setItem("refresh", data.refresh_token)  // Pasamos los tokens correctamente aquí
            onLogged(true); 
            sendLoginData(formData)
        } catch (error) {
            console.error("Error al registrarse:", error);
            alert("Error al registrarse. Inténtalo de nuevo.");
        }
    };

    return<>
        {
            currentPage === "login" ? (
                <FormLogin onLogin={updateFormLogin} onPage={setCurrentPage}/>
            ) : 
            (
                <FormSignUp onUpdate={updateFormSignUp} onPage={setCurrentPage} onRegister={sendRegisterData}/>
            )
        } 
    </>
}