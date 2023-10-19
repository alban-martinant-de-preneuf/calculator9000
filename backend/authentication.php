<?php

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

if (isset($_GET['signin'])) {
    if (!isset($_POST['email']) || !isset($_POST['password']) || !isset($_POST['passwordConfirm'])) {
        echo json_encode(['message' => 'Please fill in all fields.', 'success' => false]);
        die();
    }
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);
    $password2 = htmlspecialchars($_POST['passwordConfirm']);

    foreach ($_POST as &$arg) {
        if (empty($arg)) {
            echo json_encode(['message' => 'Please fill in all fields.', 'success' => false]);
            die();
        }
        $arg = htmlspecialchars($arg);
    }

    if ($password !== $password2) {
        echo json_encode(['message' => 'Passwords do not match.', 'success' => false]);
        die();
    }

    $user = getUser($email, $db);

    if ($user) {
        echo json_encode(['message' => 'User already exists.', 'success' => false]);
        die();
    }

    $password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $db->prepare('INSERT INTO user (email, password) VALUES (:email, :password)');
    $stmt->execute(['email' => $email, 'password' => $password]);

    echo json_encode(['message' => 'User created.', 'success' => true]);
}

if (isset($_GET['login'])) {
    if (!isset($_POST['email']) || !isset($_POST['password'])) {
        echo json_encode(['message' => 'Please fill in all fields.', 'success' => false]);
        die();
    }

    foreach ($_POST as &$arg) {
        if (empty($arg)) {
            echo json_encode(['message' => 'Please fill in all fields.', 'success' => false]);
            die();
        }
        $arg = htmlspecialchars($arg);
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

    $_SESSION['user'] = $user;

    echo json_encode([
        'message' => 'User logged in.',
        'success' => true,
        'user' => [$user['id'], $user['email']],
        'sessionId' => [session_id()]
    ]);
}

if (isset($_GET['logout'])) {
    session_destroy();
    echo json_encode(['message' => 'User logged out.', 'success' => true]);
}
