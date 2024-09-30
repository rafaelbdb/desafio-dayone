import React from 'react';
import toastr from 'toastr';
import UsuarioService from '../services/UsuarioService';
import FormUsuario from './FormUsuario';

function EditModal({ usuario, onClose, onSave }) {
    const [formData, setFormData] = useState(usuario);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await UsuarioService.atualizarUsuario(formData);
            onSave(formData);
        } catch (error) {
            toastr.error(`Erro ao atualizar usuário ${usuario.nome}!`);
        }
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <h2>Editar Usuário</h2>
                <FormUsuario formData={formData} setFormData={setFormData} onClose={onClose} />
            </div>
        </div>
    );
}

export default EditModal;