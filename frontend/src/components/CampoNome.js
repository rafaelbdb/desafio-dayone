import React from "react";

function CampoNome() {
    return (
        <div className="row">
            <div className="form-group col">
                <label htmlFor="nome_usuario" className="form-label">Nome: </label>
                <input type="text" id="nome_usuario" name="nome_usuario" className="form-control"></input>
            </div>
        </div>
    );
}

export default CampoNome;