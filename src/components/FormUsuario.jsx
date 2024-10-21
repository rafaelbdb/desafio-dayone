import React from 'react';
import BotoesForm from './BotoesForm';
import Campo from './Campo';

function FormUsuario({
    title,
    type = 'criar',
    formData = { nome: '', email: '', senha: '' },
    setFormData,
    onSave,
    onClose,
    onClear
}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const campos = [
        { id: 'nome', label: 'Nome', type: 'text' },
        { id: 'email', label: 'Email', type: 'email' },
        { id: 'senha', label: 'Senha', type: 'password' }
    ];

    return (
        <form id='form_usuario' className='form_usuario' onSubmit={onSave}>
            <h1 id='title'>{title}</h1>
            {campos.map(({ id, label, type }) => (
                <Campo
                    key={id}
                    id={id}
                    name={id}
                    label={`${label}: `}
                    type={type}
                    value={formData[id]}
                    onChange={handleChange}
                    required
                />
            ))}
            <BotoesForm onSave={onSave} onClose={onClose} onClear={onClear} />
        </form>
    );
}

export default FormUsuario;
