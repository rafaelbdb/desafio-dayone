import React, { useEffect, useState } from "react";
import BotaoCancelar from "./BotaoCancelar";
import BotaoSalvar from "./BotaoSalvar";
import CampoFormulario from "./CampoFormulario";

function FormUsuario({ usuario, onSave, onClose }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome || "");
            setEmail(usuario.email || "");
            setSenha("");
        }
    }, [usuario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ nome, email, senha });
    }

    return (
        <div>
            <form id="form_usuario" className="form_usuario" onSubmit={handleSubmit}>
                <CampoFormulario
                    id="nome_usuario"
                    name="nome_usuario"
                    label="Nome:"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <CampoFormulario
                    id="email_usuario"
                    name="email_usuario"
                    label="Email:"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <CampoFormulario
                    id="senha_usuario"
                    name="senha_usuario"
                    label="Senha:"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <BotaoSalvar />
                <BotaoCancelar onClose={onClose} />
            </form>
        </div>
    );
}

export default FormUsuario;