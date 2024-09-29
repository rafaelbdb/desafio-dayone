import React from "react";
import CampoFormulario from "./CampoFormulario";
import BotaoSalvar from "./BotaoSalvar";

function FormUsuario() {
    return (
        <div>
            <form id="form_usuario" className="form_usuario">
                <CampoFormulario id="nome_usuario" name="nome_usuario" label="Nome:" type="text" />
                <CampoFormulario id="email_usuario" name="email_usuario" label="Email:" type="email" />
                <CampoFormulario id="senha_usuario" name="senha_usuario" label="Senha:" type="password" />
                <BotaoSalvar />
            </form>
        </div>
    );
}

export default FormUsuario;