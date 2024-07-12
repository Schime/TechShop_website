<?php
require 'db_config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['user_id'] ?? '';
$itemId = $data['item_id'] ?? '';

if (!$userId || !$itemId) {
    echo json_encode(['message' => 'User ID and Item ID are required']);
    http_response_code(400);
    exit;
}

try {
    // Check if the user already has a cart
    $stmt = $pdo->prepare('SELECT id FROM user_carts WHERE user_id = :user_id');
    $stmt->execute(['user_id' => $userId]);
    $userCart = $stmt->fetch();

    if (!$userCart) {
        // Create a new cart for the user
        $stmt = $pdo->prepare('INSERT INTO user_carts (user_id) VALUES (:user_id)');
        $stmt->execute(['user_id' => $userId]);
        $cartId = $pdo->lastInsertId();
    } else {
        $cartId = $userCart['id'];
    }

    // Check if the item already exists in the user's cart
    $stmt = $pdo->prepare('SELECT quantity FROM cart WHERE cart_id = :cart_id AND item_id = :item_id');
    $stmt->execute(['cart_id' => $cartId, 'item_id' => $itemId]);
    $cartItem = $stmt->fetch();

    if ($cartItem) {
        // Item exists in the cart, increment the quantity
        $newQuantity = $cartItem['quantity'] + 1;
        $stmt = $pdo->prepare('UPDATE cart SET quantity = :quantity WHERE cart_id = :cart_id AND item_id = :item_id');
        $stmt->execute(['quantity' => $newQuantity, 'cart_id' => $cartId, 'item_id' => $itemId]);
    } else {
        // Item does not exist in the cart, add it
        $stmt = $pdo->prepare('INSERT INTO cart (cart_id, item_id, quantity) VALUES (:cart_id, :item_id, :quantity)');
        $stmt->execute(['cart_id' => $cartId, 'item_id' => $itemId, 'quantity' => 1]);
    }

    echo json_encode(['message' => 'Item added to cart']);
    http_response_code(200);
} catch (\PDOException $e) {
    echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    http_response_code(500);
}
?>