import { useState } from "react"
import "./register.css"

export const FormSignUp = ({onUpdate, onPage}) => {


    const [form, setForm] = useState({
        fullName:"",
        email:"",
        password:""
    })

    const handleFromToDashBoard = () => {
        console.log("voy a enviar ")
        onUpdate(form)
    }

    return <>
        <div className="container_register">
            <form action="" className="form_container">
                <h2>Registrarse</h2>
                <div>
                    <label 
                    htmlFor="fullName">
                        Ingrese su nombre completo
                    </label>

                    <input 
                    type="text" 
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => setForm({...form, fullName: e.target.value})}/>
                </div>
                <div>
                    <label 
                    htmlFor="email">
                        Ingrese su email
                    </label>

                    <input 
                    type="email" 
                    name="" id="email"
                    value={form.email} 
                    onChange={(e) => setForm({...form, email:e.target.value })}/>
                </div>
                <div>
                    <label 
                    htmlFor="password">
                        Ingrese su contraseña</label>
                    <input 
                    type="password" 
                    id="password" 
                    value={form.password} 
                    onChange={(e) => setForm({...form, password:e.target.value})}/>
                </div>
                <div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleFromToDashBoard()
                        console.log(form)
                    }}>Registrarse</button>
                </div>
                <hr />
                <div>
                    <button className="ir_login" onClick={(e) => {
                        onPage("login")
                    }}>Inciar seccion</button>
                </div>
            </form>
        </div>
    </>
}

