<?php

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once 'dbConnection.php';

// if (!isset($_SESSION['user'])) {
//     echo json_encode(['message' => 'Not logged in.', 'success' => false]);
//     die();
// }

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
    $user_id = $_SESSION['user']['id'];

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
