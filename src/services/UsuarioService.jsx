import axios from 'axios'

const API_URL = 'http://localhost:8888/api/Usuario.php'

const listarUsuarios = async () => {
    return await axios.get(API_URL)
}

const criarUsuario = async (usuario) => {
    return await axios.post(API_URL, usuario)
}

const editarUsuario = async (usuario) => {
    return await axios.put(API_URL, usuario);
};

const deletarUsuario = async (id) => {
    return await axios.put(API_URL, { id, 'acao': 'deletar' })
}

const removerUsuario = async (id) => {
    return await axios.delete(API_URL, { 'data': { id } })
}

const UsuarioService = {
    listarUsuarios,
    criarUsuario,
    editarUsuario,
    deletarUsuario,
    removerUsuario
};

export default UsuarioService