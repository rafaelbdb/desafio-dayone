import React from "react";
import FormUsuario from "./components/FormUsuario";
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/App.css"

function App() {
    return (
        <div className="App">
            <h1>Criar Usuário</h1>
            <FormUsuario />
        </div>
    );
}

export default App;
