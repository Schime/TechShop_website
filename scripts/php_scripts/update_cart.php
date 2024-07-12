<?php
require 'db_config.php';

$data = json_decode(file_get_contents('php://input'), true);
$cart_id = $data['cart_id'];
$quantity = $data['quantity'];

$sql = "UPDATE cart SET quantity = :quantity WHERE id = :cart_id";
$stmt = $pdo->prepare($sql);
$stmt->execute([':quantity' => $quantity, ':cart_id' => $cart_id]);

echo json_encode(['success' => true]);
?>
