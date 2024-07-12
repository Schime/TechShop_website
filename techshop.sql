-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2024 at 03:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Samsung'),
(2, 'Apple'),
(3, 'Xiaomi');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `category_id`, `product_id`) VALUES
(1, 'Samsung Galaxy S21', 799.99, 1, 1),
(2, 'Apple iPhone 12', 999.99, 2, 1),
(3, 'Xiaomi Mi 11', 699.99, 3, 1),
(4, 'Samsung Galaxy Buds', 129.99, 1, 2),
(5, 'Apple AirPods', 159.99, 2, 2),
(7, 'Samsung Galaxy S24 Ultra', 1499.99, 1, 1),
(8, 'Apple iPhone 14 Pro Max', 1499.99, 2, 1),
(9, 'Xiaomi Mi 13T', 449.99, 3, 1),
(10, 'Samsung Galaxy Buds Pro', 125.00, 1, 2),
(11, 'Apple AirPods Pro', 309.99, 2, 2),
(12, 'Xiaomi Redmi Buds 5', 32.99, 3, 2),
(13, 'Xiaomi Mi 12T Pro', 508.99, 3, 1),
(14, 'Samsung Galaxy S23+', 799.99, 1, 1),
(15, 'Apple iPhone 13 Pro', 789.99, 2, 1),
(16, 'Samsung Galaxy Buds FE', 65.00, 1, 2),
(17, 'Apple AirPods 2', 139.99, 2, 2),
(18, 'Xiaomi Redmi Buds 4', 29.99, 3, 2),
(19, 'Xiaomi Redmi Buds 4 Pro', 69.99, 3, 2),
(20, 'Xiaomi Mi 13T Pro', 589.99, 3, 1),
(21, 'Xiaomi Mi 11T Pro', 449.99, 3, 1),
(22, 'Xiaomi Mi 14', 849.99, 3, 1),
(23, 'Samsung Galaxy S24+', 989.99, 1, 1),
(24, 'Samsung Galaxy S21 Ultra', 449.99, 1, 1),
(25, 'Samsung Galaxy S23 Ultra', 869.99, 1, 1),
(26, 'Apple iPhone X', 169.99, 2, 1),
(27, 'Apple iPhone 11', 249.99, 2, 1),
(28, 'Apple iPhone 12 Pro Max', 1179.99, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`) VALUES
(1, 'Phones'),
(2, 'Headphones');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
