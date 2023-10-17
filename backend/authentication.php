<?php

include_once 'dbConnection.php';

function getUser(string $email, PDO $db): ?array {
    $stmt = $db->prepare('SELECT * FROM user WHERE email = :email');
    $stmt->execute(['email' => $email]);
    if ($stmt->rowCount() === 0) {
        return null;
    }
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

if (isset($_GET['signin'])) {
    if (!isset($_POST['email']) || !isset($_POST['password']) || !isset($_POST['password2'])) {
        echo json_encode(['error' => 'Please fill in all fields.']);
        die();
    }
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password2 = $_POST['password2'];

    foreach ($_POST as &$arg) {
        if (empty($arg)) {
            echo json_encode(['error' => 'Please fill in all fields.']);
            die();
        }
        $arg = htmlspecialchars($arg);
    }

    if ($password !== $password2) {
        echo json_encode(['error' => 'Passwords do not match.']);
        die();
    }

    $user = getUser($email, $db);

    if ($user) {
        echo json_encode(['error' => 'Username already exists.']);
        die();
    }

    $password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $db->prepare('INSERT INTO user (email, password) VALUES (:email, :password)');
    $stmt->execute(['email' => $email, 'password' => $password]);

    echo json_encode(['success' => 'User created.']);
}

if (isset($_GET['login'])) {
    if (!isset($_POST['email']) || !isset($_POST['password'])) {
        echo json_encode(['error' => 'Please fill in all fields.']);
        die();
    }
    $email = $_POST['email'];
    $password = $_POST['password'];

    foreach ($_POST as &$arg) {
        if (empty($arg)) {
            echo json_encode(['error' => 'Please fill in all fields.']);
            die();
        }
        $arg = htmlspecialchars($arg);
    }

    $user = getUser($email, $db);

    if (!$user) {
        echo json_encode(['error' => 'email or password is incorrect.']);
        die();
    }

    if (!password_verify($password, $user['password'])) {
        echo json_encode(['error' => 'email or password is incorrect.']);
        die();
    }

    $_SESSION['user'] = $user;

    echo json_encode(['success' => 'User logged in.']);
}

if (isset($_GET['logout'])) {
    session_destroy();
    echo json_encode(['success' => 'User logged out.']);
}