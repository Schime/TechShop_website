<?php
require 'db_config.php';

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['user_id'] ?? '';

if (!$userId) {
    echo json_encode(['message' => 'User ID is required']);
    http_response_code(400);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT id FROM user_carts WHERE user_id = :user_id');
    $stmt->execute(['user_id' => $userId]);
    $cart = $stmt->fetch();

    if (!$cart) {
        echo json_encode(['message' => 'Cart not found for this user']);
        http_response_code(404);
        exit;
    }

    $cart_id = $cart['id'];

    $sql = "DELETE FROM cart WHERE cart_id = :cart_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':cart_id' => $cart_id]);

    echo json_encode(['success' => true]);
    http_response_code(200);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    http_response_code(500);
}
?>
