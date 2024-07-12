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
    $stmt = $pdo->prepare('SELECT * FROM user WHERE mail = :mail');
    $stmt->execute(['mail' => $email]);
    $user = $stmt->fetch();

    if ($user && ($password == $user['password'])) {
        echo json_encode(['message' => 'Login successful', 'user_id' => $user['id']]);
        http_response_code(200);
    } else {
        echo json_encode(['message' => 'Invalid mail or password']);
        http_response_code(401);
    }
} catch (\PDOException $e) {
    echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    http_response_code(500);
}
?>
