import React from 'react';

function ConfirmaDeletarModal({ usuario, onClose, onConfirm }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Confirmar Exclusão</h2>
                <p>Tem certeza que deseja excluiro o usuário {usuario.nome}?</p>
                <button onClick={onConfirm} className='btn btn-danger'>Confirmar</button>
                <button onClick={onClose} className='btn btn-warning'>Cancelar</button>
            </div>
        </div>
    )
}

export default ConfirmaDeletarModal;