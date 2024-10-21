import React from 'react';
import Botao from './Botao';

function ModalDeletar({ usuario, onConfirm, onClose }) {
    return (
        <div className='modal-overlay fade-in' onClick={onClose}>
            <div className='modal modal_delete' onClick={(e) => e.stopPropagation()}>
                <div className='modal-content'>
                    <h2>Confirmar Exclusão?</h2>
                    <p>Tem certeza que deseja excluir o usuário '{usuario.nome}'?</p>
                    <div className='form-group'>
                        <Botao id='confirmar' onClick={onConfirm} />
                        <Botao id='cancelar' onClick={onClose} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDeletar;
