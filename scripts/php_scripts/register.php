<?php
require 'db_config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(['message' => 'Email and password are required']);
    http_response_code(400);
    exit;
}

try {
    // Check if the email already exists
    $stmt = $pdo->prepare('SELECT * FROM user WHERE mail = :mail');
    $stmt->execute(['mail' => $email]);
    $existingUser = $stmt->fetch();

    if ($existingUser) {
        echo json_encode(['message' => 'Email already registered']);
        http_response_code(409); // Conflict
        exit;
    }


    // Insert the new user into the database
    $stmt = $pdo->prepare('INSERT INTO user (mail, password) VALUES (:email, :password)');
    $stmt->execute([
        'email' => $email,
        'password' => $password
    ]);

    echo json_encode(['message' => 'User registered successfully']);
    http_response_code(201); // Created
} catch (\PDOException $e) {
    echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    http_response_code(500); // Internal Server Error
}
?>
