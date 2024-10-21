<?php

final class BancoDeDados
{
    private $dbType = 'mysql';
    private $dbHost = 'localhost';
    private $dbName = 'desafio';
    private $dbUser = 'root';
    private $dbPswd = 'cd0841';
    private $conn;

    public function conexao() {
        $this->conn = null;
        try {
            $this->conn = new PDO("$this->dbType:host=$this->dbHost;dbname=$this->dbName", $this->dbUser, $this->dbPswd);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Erro de conexão com o Banco: {$e->getMessage()}");
        }
        return $this->conn;
    }
}
