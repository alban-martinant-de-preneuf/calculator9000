<?php

include_once 'dbConnection.php';

if (isset($_GET['save-operation'])) {
    if (!isset($_POST['operation'])) {
        echo json_encode(['error' => 'Nothing to save.']);
        die();
    }
    $operation = $_POST['operation'];
    $result = $_POST['result'];
    $user_id = $_SESSION['user']['id'];

    $stmt = $db->prepare('INSERT INTO operation (operation, result, owner_id) VALUES (:operation, :result, :owner_id)');
    $stmt->execute([
        'operation' => $operation,
        'result' => $result,
        'owner_id' => $user_id]
    );

    echo json_encode(['success' => 'Operation saved.']);
}

if (isset($_GET['get-operations'])) {
    $user_id = $_SESSION['user']['id'];

    $stmt = $db->prepare('SELECT * FROM operation WHERE owner_id = :owner_id');
    $stmt->execute(['owner_id' => $user_id]);

    $operations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($operations);
}
