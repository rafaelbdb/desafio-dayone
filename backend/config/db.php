<?php

class Database
{
    private $host = 'localhost';
    private $db_name = 'desafio';
    private $username = 'root';
    private $password = 'cd0841';
    public $conn;

    public function getConnection()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=$this->host;dbname=$this->db_name", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            die("Erro de conexão: " . $exception->getMessage());
        }

        return $this->conn;
    }
}
