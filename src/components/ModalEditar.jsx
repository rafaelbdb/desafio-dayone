import React, { useEffect, useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import UsuarioService from '../services/UsuarioService';
import FormUsuario from './FormUsuario';

function ModalEditar({ usuario, onSave, onClose }) {
    const [formData, setFormData] = useState(usuario);
    const [isVisible, setIsVisible] = useState(true);
    const defaultState = {
        nome: '',
        email: '',
        senha: ''
    };

    useEffect(() => {
        setFormData(usuario);
    }, [usuario]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleReset = () => {
        setFormData(defaultState);
    };

    const hanldeSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData) {
                await UsuarioService.editarUsuario(formData);
                onSave(formData);
                toastr.success(`Sucesso ao editar usuário com nome '${usuario.nome}' e email '${usuario.email}'`);
                handleClose();
            } else {
                toastr.warning(`Erro ao tentar editar usuário. O ID foi fornecido?`);
            }
        } catch (error) {
            toastr.error(`Erro ao editar usuário com nome '${usuario.nome}' e email '${usuario.email}': ${error.message}`);
        }
    };

    return (
        <div className={`modal-overlay ${isVisible ? 'fade-in' : 'fade-out'}`} onClick={handleClose}>
            <div className='modal' onClick={(e) => {e.stopPropagation();}}>
                <div className='modal-content'>
                    <FormUsuario
                        title='Editar Usuário'
                        type='editar'
                        formData={formData}
                        setFormData={setFormData}
                        onSave={hanldeSubmit}
                        onClose={handleClose}
                        onClear={handleReset}
                    />
                </div>
            </div>
        </div>
    );
}

export default ModalEditar;
