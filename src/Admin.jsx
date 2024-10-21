import React, { useEffect, useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './assets/css/Admin.css';
import Botao from './components/Botao';
import ModalDeletar from './components/ModalDeletar';
import ModalEditar from './components/ModalEditar';
import UsuarioService from './services/UsuarioService';

function Admin() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEdit, setUsuarioEdit] = useState(null);
    const [usuarioDelete, setUsuarioDelete] = useState(null);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const {
                data: { result: lista }
            } = await UsuarioService.listarUsuarios();
            setUsuarios(lista || []);
            toastr.success(
                lista
                    ? 'Sucesso ao carregar usuários'
                    : 'Nenhum usuário encontrado'
            );
        } catch (error) {
            toastr.error('Erro ao carregar usuários');
        }
    };

    const handleEdit = (usuario) => setUsuarioEdit(usuario);

    const handleDelete = (usuario) => setUsuarioDelete(usuario);

    const handleDeleteConfirm = async () => {
        const msgBase = `ao deletar usuário com ID '${usuarioDelete.id}'`;
        try {
            const resultado = await UsuarioService.deletarUsuario(usuarioDelete.id);
            if (resultado.data.status === 1) {
                setUsuarios(usuarios.filter((u) => u.id !== usuarioDelete.id));
                toastr.success(`Sucesso ${msgBase}`);
            } else {
                toastr.warning(`${resultado.data.msg}`);
            }
        } catch (error) {
            toastr.error(`Erro ${msgBase}: ${error.message}`);
        } finally {
            setUsuarioDelete(null);
        }
    };

    return (
        <div className='Admin'>
            <h2>Usuários</h2>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nome}</td>
                            <td>{u.email}</td>
                            <td>
                                <Botao
                                    id='editar'
                                    onClick={() => handleEdit(u)}
                                />
                                <Botao
                                    id='deletar'
                                    onClick={() => handleDelete(u)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {usuarioEdit && (
                <ModalEditar
                    usuario={usuarioEdit}
                    onSave={(usuarioEditado) => {
                        setUsuarios(
                            usuarios.map((u) =>
                                u.id === usuarioEditado.id ? usuarioEditado : u
                            )
                        );
                    }}
                    onClose={() => setUsuarioEdit(null)}
                />
            )}
            {usuarioDelete && (
                <ModalDeletar
                    usuario={usuarioDelete}
                    onConfirm={handleDeleteConfirm}
                    onClose={() => setUsuarioDelete(null)}
                />
            )}
        </div>
    );
}

export default Admin;
