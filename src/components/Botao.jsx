import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Botao({ id, onClick }) {
    const texto = id.charAt(0).toUpperCase() + id.slice(1);

    const config = {
        salvar:   { estilo: 'success',         icon: 'floppy',       tipo: 'submit' },
        limpar:   { estilo: 'outline-primary', icon: 'transparency', tipo: 'reset'  },
        editar:   { estilo: 'warning',         icon: 'pen',          tipo: 'button' },
        deletar:  { estilo: 'danger',          icon: 'trash',        tipo: 'button' },
        cancelar: { estilo: 'secondary',       icon: 'x-circle',     tipo: 'button' }
    };

    const { estilo = 'primary', icon = '', tipo = 'button' } = config[id] || {};

    return (
        <button type={tipo} id={id} className={`btn btn-${estilo}`} onClick={onClick}>
            {icon && <i className={`icone bi bi-${icon}`}></i>}
            {texto}
        </button>
    );
}

export default Botao;
