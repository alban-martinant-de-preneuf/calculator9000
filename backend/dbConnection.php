<?php

session_name('calculator9000');
session_start();

header('Access-Control-Allow-Origin: http://localhost:5173');

$db = getDatabase();

function getDatabase(): PDO {
    try {
        $db_config = parse_ini_file('db.ini');
        $db = new PDO(
            $db_config['type'] . ':dbname=' . $db_config['name']
                . ';host=' . $db_config['host']
                . ';charset=' . $db_config['charset'],
            $db_config['user'],
            $db_config['password']
        );
        $db->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Could not connect to database.']);
        die();
    }
    return $db;
}