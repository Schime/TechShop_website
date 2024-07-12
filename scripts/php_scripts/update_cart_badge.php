<?php

require 'db_config.php';

try {
    $stmt = $pdo->query("SELECT SUM(quantity) AS total_items FROM cart");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && isset($result['total_items'])) {
        $total_items = $result['total_items'];
        echo $total_items; 
    } else {
        echo 0;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>