import React from "react";

function BotaoCancelar(onClose) {
    return (
        <div>
            <button type="reset" id="restar_usuario" className="btn btn-warning" onClick={onClose}>Cancelar</button>
        </div>
    )
}

export default BotaoCancelar;