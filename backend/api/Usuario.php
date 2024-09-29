<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once(__DIR__ . "/../config/db.php");

final class Usuario
{
    private $conn, $agora;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->getConnection();
        $this->agora = date('Y-m-d H:i:s');
    }

    public function criar($nome, $email, $senha)
    {
        $sql = "INSERT INTO usuarios (
                        nome
                        ,email
                        ,senha
                        ,created_by
                        ,created_at
                    ) VALUES (
                        :nome
                        ,:email
                        ,:senha
                        ,:created_by
                        ,:created_at
                    )
                ";
        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
        $createdBy = 'quem_criou';

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senhaHash);
        $stmt->bindParam(':created_by', $createdBy);
        $stmt->bindParam(':created_at', $this->agora);

        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'message' => "Usuário com nome '{$nome}' e email '{$email}' criado com sucesso.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'message' => "Erro ao criar o usuário com nome '{$nome}' e email '{$email}'!\n\n{$e->getMessage()}"];
        }
    }

    public function buscar($id = null)
    {
        $idQuery = $id ? "WHERE id = :id" : "";
        $sql = "SELECT *
                FROM usuarios
                $idQuery
                ";
        $stmt = $this->conn->prepare($sql);
        if ($id) {
            $stmt->bindParam(':id', $id);
        }

        try {
            $stmt->execute();
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return ['status' => 1, 'message' => 'Busca de usuário(s) realizada com sucesso.', 'result' => $resultado];
        } catch (PDOException $e) {
            $msg = $id ?  "Erro ao buscar usuário com ID '{$id}'!\n\n{$e->getMessage()}" : "Erro ao buscar usuários!";
            return ['status' => 0, 'message' => $msg];
        }
    }

    public function alterar($id, $nome, $email, $senha)
    {
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

        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'message' => "Usuário com ID '{$id}' alterado com sucesso.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'message' => "Erro ao alterar o usuário com ID '{$id}'!\n\n{$e->getMessage()}"];
        }
    }

    public function deletar($id)
    {
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

        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'message' => "Usuário com ID '{$id}' deletado com sucesso.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'message' => "Erro ao deletar o usuário com ID '{$id}'!\n\n{$e->getMessage()}"];
        }
    }

    public function remover($id)
    {
        $sql = "DELETE FROM usuarios WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);

        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'message' => "Usuário com ID '{$id}' removido com sucesso.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'message' => "Erro ao remover o usuário com ID '{$id}'!\n\n{$e->getMessage()}"];
        }
    }
}

$usuario = new Usuario();

$method = $_SERVER['REQUEST_METHOD'];
$response = ['status' => 0, 'message' => ''];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        $id = $_GET['id'] ?? null;
        $response = $usuario->buscar($id);
        break;
    case 'POST':
        $response['message'] = 'Dados insuficientes para criar o usuário!';
        if ($data['nome'] && $data['email'] && $data['senha']) {
            $response = $usuario->criar($data['nome'], $data['email'], $data['senha']);
        }
        break;
    case 'PUT':
        $response['message'] = 'ID não fornecido para remover o usuário!';
        if ($data['id']) {
            if ($data['deletar']) {
                $response = $usuario->deletar($data['id']);
            } else {
                $response = $usuario->alterar($data['id'], $data['nome'], $data['email'], $data['senha']);
            }
        }
        break;
    case 'DELETE':
        $response['message'] = 'ID não fornecido para remover o usuário!';
        if (isset($data['id'])) {
            $response = $usuario->remover($data['id']);
        }
        break;

    default:
        $response = ['message' => 'Método não suportado'];
        break;
}

echo json_encode($response);
