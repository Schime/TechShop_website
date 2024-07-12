<?php

require 'db_config.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"));

    if($data != null){

        $category = $data->product->products;

        header('Content-Type: application/json');

        try {
            $stmt = $pdo->prepare("SELECT * FROM items WHERE product_id = :id");
            $stmt->execute([':id' => $category ]);
            $item = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($item) {
                echo json_encode($item);
            } else {
                echo json_encode(['error' => 'Item not found']);
            }
        } catch(PDOException $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }


    } else {
        echo "Invalid JSON data";
    }
}

?>