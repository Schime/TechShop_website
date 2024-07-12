<?php
require 'db_config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['user_id'] ?? '';

if (!$userId) {
    echo json_encode(['message' => 'User ID is required']);
    http_response_code(400);
    exit;
}

try {
    // Get the cart_id from user_carts for the given user_id
    $stmt = $pdo->prepare('SELECT id FROM user_carts WHERE user_id = :user_id');
    $stmt->execute(['user_id' => $userId]);
    $userCart = $stmt->fetch();

    if (!$userCart) {
        echo json_encode(['message' => 'No cart found for this user']);
        http_response_code(404);
        exit;
    }

    $cartId = $userCart['id'];

    // Fetch all items from the cart for the given cart_id
    $stmt = $pdo->prepare('
        SELECT cart.item_id, cart.quantity, items.name, items.price, items.image
        FROM cart
        JOIN items ON cart.item_id = items.id
        WHERE cart.cart_id = :cart_id
    ');
    $stmt->execute(['cart_id' => $cartId]);
    $cartItems = $stmt->fetchAll();

    echo json_encode($cartItems);
    http_response_code(200);
} catch (\PDOException $e) {
    echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    http_response_code(500);
}
?>