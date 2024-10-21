import React, { useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './assets/css/App.css';
import FormUsuario from './components/FormUsuario';
import UsuarioService from './services/UsuarioService';

function App() {
    const defaultState = { nome: '', email: '', senha: '' };
    const [formData, setFormData] = useState(defaultState);

    const handleClear = () => {
        setFormData(defaultState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target.closest('form');

        const { nome, email, senha } = formData;

        if (!nome || !email || !senha) {
            toastr.warning('É obrigatório preencher todos os campos para criar o usuário!');
            return;
        }

        const valido = form.checkValidity();
        if (!valido) {
            form.reportValidity();
            return;
        }

        const msgBase = `ao criar usuário com nome ${nome} e email ${email}`;
        try {
            const resultado = await UsuarioService.criarUsuario(formData);
            if (resultado.data.status === 1) {
                toastr.success(`Sucesso ${msgBase}`);
                handleClear();
            } else {
                toastr.warning(`${resultado.data.msg}`);
            }
        } catch (error) {
            toastr.error(`Erro ${msgBase}: ${error.message}`);
        }
    };

    return (
        <div className='App'>
            <FormUsuario
                title='Criar Usuário'
                formData={formData}
                setFormData={setFormData}
                onSave={handleSubmit}
                onClear={handleClear}
            />
        </div>
    );
}

export default App;
