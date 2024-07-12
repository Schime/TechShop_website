# TechShop
TechShop is a web-based e-commerce platform for browsing and purchasing technology products. The project includes features for user registration, login, product browsing, cart management, and purchase completion. It is designed to run on a local server using XAMPP.

## Table of Contents
- TechShop
  - Table of Content
  - Features
  - Prerequisites
  - Installation
  - Usage
  - Project Structure

# Features
  - User registration and login
  - Browsing products by categories
  - Adding products to the cart
  - Viewing and managing the cart
  - Completing a purchase

# Prerequisites
  - XAMPP (for Apache and MySQL)
  - Web browser

# Installation
  1. **Install XAMPP:**
    <br/>Download and install XAMPP from [here](https://www.apachefriends.org/download).
  2. **Clone the repository:**
     <br/>Place the cloned repository in the *htdocs* folder of your XAMPP installation
  3. **Import the database:**
     - Open XAMPP Control Panel and start Apache and MySQL
     - Open your web browser and go to http://localhost/phpmyadmin
     - Create a new database named 'techshop'
     - Import the SQL file 'techshop.sql' located in the project directory
  4. **Configure the database connection:**
     - Open the 'db_config.php' file located in the project directory
     - Update the database connection details if necessary
     
# Usage
  1. **Start XAMPP:**
     - Open XAMPP Control Panel
     - Start Apache and MySQL
  2. **Access the application:**
     - Open your web browser and navigate to http://localhost/index_login.html
  3. **Navigate through the application:**
     - Register a new user or log in with existing credentials
     - Browse products, add items to your cart, and proceed to checkout

# Project Structure
```
TechShop/
│
├── images/
|   ├── Apple
│   |   ├── Headphones
│   |   |   ├── airpods_1.jpg
│   |   |   ├── airpods_pro.jpg
│   |   |   ├── airpods_2.jpg
│   |   ├── 11.jpg
│   |   ├── iphone_12.jpg
│   |   ├── iphone_14_pro_max_1TB.jpg
│   |   ├── iphone_13_pro.jpg
│   |   ├── x.png
|   ├── icons
│   |   ├── magnifier_search.png
|   ├── Samsung
│   |   ├── Headphones
│   |   |   ├── samsung_galaxy_buds_pro.png
│   |   |   ├── buds_fe.jpg
│   |   ├── samsung_galaxy_s21.jpg
│   |   ├── samsung_galaxy_s24_ultra_512GB.jpg
│   |   ├── s23+.jpg
│   |   ├── s24+.jpg
│   |   ├── s21_ultra.jpg
│   |   ├── samsung_galaxy_s23_ultra_256GB.jpg
|   ├── Xiaomi
│   |   ├── Headphones
│   |   |   ├── redmi_buds_5.jpg
│   |   |   ├── redmi_buds_4.jpg
│   |   |   ├── redmi_buds_4_pro.png
│   |   ├── mi_11.jpg
│   |   ├── mi_13_t.jpg
│   |   ├── 12_t_pro.jpg
│   |   ├── 13_t_pro.jpg
│   |   ├── 11_t_pro.png
│   |   ├── 14.jpg
|
├── scripts/
│   ├── js_scripts
│   |   ├── cart.js
│   |   ├── index_login.js
│   |   ├── products.js
│   |   ├── register.js
│   ├── php_scripts
│   |   ├── add_to_cart.php
│   |   ├── clear_cart.php
│   |   ├── db_config.php
│   |   ├── fetch_cart.php
│   |   ├── fetch_categories.php
│   |   ├── fetch_items.php
│   |   ├── fetch_products.php
│   |   ├── fetch_products_category.php
│   |   ├── register.php
│   |   ├── remove_from_cart.php
│   |   ├── update_cart.php
│   |   ├── update_cart_badge.php
|
├── styles/
│   ├── cart.css
│   ├── index_login.css
│   ├── products.css
│   ├── register.css
|
├── css/
│   ├── cart.css
│   ├── index_login.css
│   ├── products.css
│   └── register.css
│
├── cart.html
├── index_login.html
├── products.html
├── register.html
├── techshop.sql
└── README.md
```

