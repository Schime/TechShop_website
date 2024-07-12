<?php
require 'db_config.php';

$sql = "SELECT id, name FROM products";
$stmt = $pdo->query($sql);

$products = array();
while ($row = $stmt->fetch()) {
    $products[] = $row;
}

echo json_encode($products);
?>