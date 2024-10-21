import React from 'react';
import Botao from './Botao';

function BotoesForm({ onSave, onClear, onClose }) {
    const botoes = [
        { id: 'salvar', onClick: onSave },
        { id: 'limpar', onClick: onClear },
        onClose && { id: 'cancelar', onClick: onClose }
    ].filter(Boolean); // Remove valores 'null' caso onClose não esteja presente

    return (
        <div id='botoes_form'>
            {botoes.map(({ id, onClick }) => (
                <Botao key={id} id={id} onClick={onClick} />
            ))}
        </div>
    );
}

export default BotoesForm;
