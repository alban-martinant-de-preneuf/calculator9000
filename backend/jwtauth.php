<?php

use \Firebase\JWT\JWT;

require_once 'dbConnection.php';

function getUser(string $email, PDO $db): ?array
{
    $stmt = $db->prepare('SELECT * FROM user WHERE email = :email');
    $stmt->execute(['email' => $email]);
    if ($stmt->rowCount() === 0) {
        return null;
    }
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

if (isset($_GET['login'])) {
    if (!isset($_POST['email']) || !isset($_POST['password'])) {
        echo json_encode(['message' => 'Please fill in all fields.', 'success' => false]);
        die();
    }

    foreach ($_POST as &$element) {
        if (empty($element)) {
            echo json_encode(['message' => 'Please fill in all fields.', 'success' => false]);
            die();
        }
        $element = htmlspecialchars($element);
    }

    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $user = getUser($email, $db);

    if (!$user) {
        echo json_encode(['message' => 'email or password is incorrect.', 'success' => false]);
        die();
    }

    if (!password_verify($password, $user['password'])) {
        echo json_encode(['message' => 'email or password is incorrect.', 'success' => false]);
        die();
    }

    $payload = [
        'iat' => time(),
        'exp' => time() + 3600,
        'id' => $user['id'],
        'email' => $user['email']
    ];

    $key = $_ENV['JWT_KEY'];

    $jwt = JWT::encode($payload, $key, 'HS256');

    setcookie('jwtToken', $jwt, time() + 3600000, '/', '', false, true);

    echo json_encode([
        'message' => 'User logged in.',
        'success' => true,
        'user' => [$user['id'], $user['email']]
    ]);
}
