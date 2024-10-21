<?php

header("Access-Control-Allow-Origin: *");  // Permite todas as origens. Substitua o "*" pela origem específica, se necessário.
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  // Métodos HTTP permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Cabeçalhos permitidos
header("Access-Control-Allow-Credentials: true");  // Se precisar enviar cookies ou autenticação com credenciais

require_once(__DIR__ . "/BancoDeDados.php");

final class Usuario
{
    private $conn, $erroPadrao, $agora;

    public function __construct()
    {
        $db = new BancoDeDados();
        $this->conn = $db->conexao();
        $this->agora = date('Y-m-d H:i:s');
        $this->erroPadrao = ['status' => 0, 'msg' => "Erro: ID precisa ser informado!"];
    }

    public function criar($nome, $email, $senha)
    {
        if (!$nome || !$email || !$senha) {
            return ['status' => 0, 'msg' => 'Dados insuficientes para criar usuário.'];
        }

        $existe = $this->buscar(['email' => $email])['result'];
        if ($existe) {
            return ['status' => 0, 'msg' => "Já existe usuário cadastrado com o email '{$email}'."];
        }

        $sql = "INSERT INTO usuarios
                        (
                            nome
                            , email
                            , senha
                            , created_by
                            , created_at
                        ) VALUES (
                            :nome
                            , :email
                            , :senha
                            , :created_by
                            , :created_at
                        )
                ";

        $createdBy = 'quem_criou';
        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senhaHash);
        $stmt->bindParam(':created_by', $createdBy);
        $stmt->bindParam(':created_at', $this->agora);

        $msg = "ao criar usuário com nome '{$nome}' e email '{$email}'";
        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'msg' => "Sucesso {$msg}", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro {$msg}:\n{$e->getMessage()}"];
        }
    }

    public function listar()
    {
        $sql = "SELECT *
                FROM usuarios
                WHERE 1=1
                AND deleted_by IS NULL
                AND deleted_at IS NULL
                ";

        $stmt = $this->conn->prepare($sql);

        try {
            $stmt->execute();
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $msg = $resultado ? "Sucesso ao listar usuários" : "Não há usuários para listar";
            return ['status' => 1, 'msg' => $msg, 'result' => $resultado];
        } catch (PDOException $e) {
            return ['stauts' => 0, 'msg' => "Erro ao listar usuários:\n{$e->getMessage()}"];
        }
    }

    public function buscar($params = [])
    {
        $filtros = [];
        foreach ($params as $key => $value) {
            $filtros[] = "$key = :$key";
        }
        $filtro = count($filtros) ? ' AND ' . implode(' AND ', $filtros) : '';

        $sql = "SELECT *
            FROM usuarios
            WHERE 1=1
            AND deleted_by IS NULL
            AND deleted_at IS NULL
            $filtro
            ";

        $stmt = $this->conn->prepare($sql);

        foreach ($params as $key => &$value) {
            $stmt->bindParam(":$key", $value);
        }

        try {
            $stmt->execute();
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $filtrosInformados = implode(', ', array_map(fn($key, $value) => "$key = '$value'", array_keys($params), $params));

            $msg = $resultado ? "Sucesso ao buscar usuário(s) com os seguintes filtros: $filtrosInformados" : "Nenhum usuário encontrado com os seguintes filtros: $filtrosInformados";

            return ['status' => $resultado ? 1 : 0, 'msg' => $msg, 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro ao buscar usuário(s):\n{$e->getMessage()}"];
        }
    }

    public function buscarTodos()
    {
        $sql = "SELECT * FROM usuarios";

        $stmt = $this->conn->prepare($sql);

        try {
            $stmt->execute();
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $msg = $resultado ? "Sucesso ao buscar TODOS os usuários" : "Nenhum usuário encontrado";
            return ['status' => 1, 'msg' => $msg, 'result' => $resultado];
        } catch (PDOException $e) {
            return ['stauts' => 0, 'msg' => "Erro ao buscar TODOS os usuários:\n{$e->getMessage()}"];
        }
    }

    public function alterar($id, $nome, $email, $senha)
    {
        if (!$id) return $this->erroPadrao;

        if (!$this->buscar(['id' => $id])['result']) {
            return ['status' => 0, 'msg' => "Erro ao alterar o usuário: Nenhum usuário encontrado com ID '{$id}'!"];
        }

        $sql = "UPDATE usuarios
                SET
                    nome = :nome
                    ,email = :email
                    ,senha = :senha
                    ,updated_by = :updated_by
                    ,updated_at = :updated_at
                WHERE id = :id
                ";
        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
        $updatedBy = 'quem_alterou';
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senhaHash);
        $stmt->bindParam(':updated_by', $updatedBy);
        $stmt->bindParam(':updated_at', $this->agora);
        $stmt->bindParam(':id', $id);

        $msg = "ao alterar usuário com ID '{$id}'";
        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'msg' => "Sucesso {$msg}.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro {$msg}:\n{$e->getMessage()}"];
        }
    }

    public function deletar($id)
    {
        if (!$id) return $this->erroPadrao;

        $sql = "UPDATE usuarios
                SET
                    deleted_by = :deleted_by
                    ,deleted_at = :deleted_at
                WHERE id = :id
                ";
        $deletedBy = 'quem_deletou';
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':deleted_by', $deletedBy);
        $stmt->bindParam(':deleted_at', $this->agora);
        $stmt->bindParam(':id', $id);

        $msg = "ao deletar usuário com ID '{$id}";
        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'msg' => "Sucesso {$msg}.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro {$msg}':\n{$e->getMessage()}"];
        }
    }

    public function restaurar($id)
    {
        if (!$id) return $this->erroPadrao;

        $sql = "UPDATE usuarios
                SET
                    deleted_by = NULL
                    ,deleted_at = NULL
                WHERE id = :id
                ";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);

        $msg = "ao restaurar usuário com ID '{$id}'";
        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'msg' => "Sucesso {$msg}.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro {$msg}':\n{$e->getMessage()}"];
        }
    }

    public function remover($id)
    {
        if (!$id) return $this->erroPadrao;

        $sql = "DELETE FROM usuarios WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);

        $msg = "ao remover usuário com ID '{$id}'";
        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'msg' => "Sucesso {$msg}.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro {$msg}:\n{$e->getMessage()}"];
        }
    }
}

$usuario = new Usuario();
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);
$response = ['status' => 0, 'msg' => ""];

switch ($method) {
    case 'GET':
        $response = ($_GET['todos']) ? $usuario->buscarTodos() : $usuario->buscar();
        break;
    case 'POST':
        $response = $usuario->criar($data['nome'], $data['email'], $data['senha']);
        break;
    case 'PUT':
        switch ($data['acao']) {
            case 'deletar':
                $response = $usuario->deletar($data['id']);
                break;
            case 'restaurar':
                $response = $usuario->restaurar($data['id']);
                break;
            case 'alterar':
                $response = $usuario->alterar($data['id'], $data['nome'], $data['email'], $data['senha']);
                break;

            default:
                $response['msg'] = "Ação não suportada.";
                break;
        }
        break;
    case 'DELETE':
        $response = $usuario->remover($data['id']);
        break;

    default:
        $response['msg'] = 'Método não suportado.';
        break;
}

echo json_encode($response);
