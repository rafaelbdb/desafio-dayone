import axios from "axios";

const API_URL = "http://localhost:8888/backend/api/usuario.php";

const getUsuarios = async () => {
    return await axios.get(API_URL);
}

const criarUsuario = async (usuario) => {
    return await axios.post(API_URL, usuario);
}

const atualizarUsuario = async (usuario) => {
    return await axios.put(API_URL, usuario);
}

const deletarUsuario = async (id) => {
    return await axios.put(API_URL, { id, deletar: true });
}

const removerUsuario = async (id) => {
    return await axios.delete(API_URL, { data: { id } });
}

export default {
    getUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    removerUsuario,
};
