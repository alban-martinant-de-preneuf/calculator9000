<?php

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once 'dbConnection.php';

if (!isset($_COOKIE['jwtToken'])) {
    echo json_encode(['message' => 'Not logged in.', 'success' => false]);
    die();
}

$jwtToken = $_COOKIE['jwtToken'];
$key = $_ENV['JWT_KEY'];

try {
    $decodedToken = JWT::decode($jwtToken, new Key($key, 'HS256'));
} catch (Exception $e) {
    echo json_encode(['message' => 'Not logged in.', 'success' => false]);
    die();
}

if (isset($_GET['save-operation'])) {
    if (!isset($_POST['calcul'])) {
        echo json_encode(['message' => 'Nothing to save.', 'success' => false]);
        die();
    }
    $operation = $_POST['calcul'];
    $result = $_POST['result'];
    $user_id = $decodedToken->id;
    
    $stmt = $db->prepare('INSERT INTO operation (operation, result, owner_id) VALUES (:operation, :result, :owner_id)');
    $stmt->execute(
        [
            'operation' => $operation,
            'result' => $result,
            'owner_id' => $user_id
        ]
    );

    echo json_encode(['message' => 'Operation saved.', 'success' => true]);
}

if (isset($_GET['delete-operation'])) {
    if (!isset($_GET['id'])) {
        echo json_encode(['message' => 'Nothing to delete.', 'success' => false]);
        die();
    }
    $id = $_GET['id'];
    $user_id = $decodedToken->id;

    $stmt = $db->prepare('DELETE FROM operation WHERE id = :id AND owner_id = :owner_id');
    $stmt->execute(
        [
            'id' => $id,
            'owner_id' => $user_id
        ]
    );

    if ($stmt->rowCount() === 0) {
        echo json_encode(['message' => 'Operation not found or current user is not the owner', 'success' => false]);
        die();
    }

    echo json_encode(['message' => 'Operation deleted.', 'success' => true]);
}

if (isset($_GET['get-operations'])) {

    $stmt = $db->prepare('SELECT * FROM operation WHERE owner_id = :owner_id');
    $stmt->execute(['owner_id' => $decodedToken->id]);

    $operations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'message' => 'Operations retrieved.',
        'success' => true,
        'operations' => $operations
    ]);
}
