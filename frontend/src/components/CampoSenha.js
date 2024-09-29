import React from "react";

function CampoSenha() {
    return (
        <div className="row">
            <div className="form-group col">
                <label htmlFor="senha_usuario" className="form-label">Senha: </label>
                <input type="password" id="senha_usuario" name="senha_usuario" className="form-control"></input>
            </div>
        </div>
    );
}

export default CampoSenha;