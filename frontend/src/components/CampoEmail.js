import React from "react";

function CampoEmail() {
    return (
        <div className="row">
            <div className="form-group col">
                <label htmlFor="email_usuario" className="form-label">Email: </label>
                <input type="email" id="email_usuario" name="email_usuario" className="form-control"></input>
            </div>
        </div>
    )
}

export default CampoEmail;