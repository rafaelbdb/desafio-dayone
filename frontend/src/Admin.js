import React, { useEffect, useState } from 'react';
import toastr from "toastr";
import UsuarioService from './services/UsuarioService';
import EditModal from './components/EditModal';
import ConfirmaDeletarModal from '.components/ConfirmaDeletarModal';
import FormUsuario from './components/FormUsuario';

function Admin() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState({ id: null, nome: '', email: '', senha: '' });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        UsuarioService.getUsuarios().then((response) => {
            setUsuarios(response.data.result);
        });
    }, []);

    handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editMode) {
            try {
                await UsuarioService.atualizarUsuario(usuario);
                toastr.success(`Usuário com ID ${usuario.id} atualizado com sucesso!`)
            } catch (error) {
                toastr.error(`Erro ao atualizar o usuário com ID ${usuario.id}!`)
            }
        } else {
            try {
                await UsuarioService.criarUsuario(usuario);
                toastr.success(`Usuário com nome ${usuario.nome} e email ${usuario.email} criado com sucesso!`)
            } catch (error) {
                toastr.error(`Erro ao criar o usuário com nome ${usuario.nome} e email ${usuario.email}!`)
            }
        }
    }

    return (
        <div>
            <h1>Usuários</h1>
            <FormUsuario />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button onClick={() => handleEditar(usuario.id)}>Editar</button>
                                <button onClick={() => handleDeletar(usuario.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;