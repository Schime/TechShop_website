<?php
require 'db_config.php';

$sql = "SELECT id, name FROM category";
$stmt = $pdo->query($sql);

$categories = array();
while ($row = $stmt->fetch()) {
    $categories[] = $row;
}

echo json_encode($categories);
?>
