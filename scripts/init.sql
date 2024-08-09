USE rider_essentials;

CREATE USER 'userapi'@'%' IDENTIFIED BY 'P@ssw0rdUs3r';
GRANT ALL PRIVILEGES ON rider_essentials.* TO 'userapi'@'%';
FLUSH PRIVILEGES;

-- Crear tabla de usuarios
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image BLOB,
    image_url VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de categorías
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de productos
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image BLOB,
    image_url VARCHAR(100) NOT NULL,
    category_id INT REFERENCES categories(category_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de etiquetas
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Crear tabla de etiquetas de productos
CREATE TABLE product_tags (
    product_id INT REFERENCES products(product_id),
    tag_id INT REFERENCES tags(tag_id),
    PRIMARY KEY (product_id, tag_id)
);

-- Crear tabla de carritos
CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de items del carrito
CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(cart_id),
    product_id INT REFERENCES products(product_id),
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos en la tabla de usuarios
INSERT INTO users (name, email, password, image_url) VALUES
('John Doe', 'john@example.com', '123456789', 'defaultUser.jpg'),
('Jane Smith', 'jane@example.com', '987654321', 'defaultUser.jpg'),
('Alice Johnson', 'alice@example.com', 'password1', 'defaultUser.jpg'),
('Bob Brown', 'bob@example.com', 'password2', 'defaultUser.jpg'),
('Carol White', 'carol@example.com', 'password3', 'defaultUser.jpg'),
('Dave Black', 'dave@example.com', 'password4', 'defaultUser.jpg'),
('Eve Green', 'eve@example.com', 'password5', 'defaultUser.jpg'),
('Frank Harris', 'frank@example.com', 'password6', 'defaultUser.jpg'),
('Grace Lewis', 'grace@example.com', 'password7', 'defaultUser.jpg'),
('Hank Walker', 'hank@example.com', 'password8', 'defaultUser.jpg');

-- Insertar datos en la tabla de categorías
INSERT INTO categories (name, description) VALUES
('Accesorios de Rendimiento', 'Mejora el rendimiento de tu moto'),
('Lubricantes', 'Aceites y lubricantes para motos'),
('Repuestos', 'Repuestos y partes de motos'),
('Equipamiento', 'Equipamiento para motoristas'),
('Neumáticos', 'Neumáticos de diferentes tipos y marcas'),
('Accesorios Estéticos', 'Mejora la apariencia de tu moto'),
('Herramientas', 'Herramientas para el mantenimiento de motos'),
('Ropa', 'Ropa y accesorios de protección para motoristas'),
('Electrónica', 'Componentes electrónicos para motos'),
('Protecciones', 'Protecciones para el motorista y la moto');

-- Insertar datos en la tabla de productos
INSERT INTO products (name, description, price, image_url, category_id) VALUES
('Escape Akrapovic', 'Escape de alto rendimiento en fibra de carbono', 1200.00, 'akrapovic.jpg', 1),
('Aceite Castrol 4T', 'Aceite sintético para motos de 4 tiempos', 30.00, 'default.jpg',2),
('Filtro de aire K&N', 'Filtro de aire de alto rendimiento', 50.00, 'default.jpg', 3),
('Casco Shoei', 'Casco integral de alta seguridad', 400.00, 'default.jpg', 4),
('Neumático Michelin', 'Neumático radial para motos deportivas', 150.00,'default.jpg', 5),
('Manillar Rizoma', 'Manillar de aluminio anodizado', 120.00,'default.jpg', 6),
('Llave dinamométrica', 'Llave para apriete controlado', 80.00, 'default.jpg',7),
('Chaqueta Alpinestars', 'Chaqueta con protecciones integradas', 250.00, 'default.jpg', 8),
('Intercomunicador Sena', 'Sistema de comunicación para casco', 200.00, 'default.jpg', 9),
('Rodilleras Dainese', 'Protección para las rodillas', 90.00, 'default.jpg', 10);

-- Insertar datos en la tabla de etiquetas
INSERT INTO tags (name) VALUES
('Akrapovic'),
('Castrol'),
('K&N'),
('Shoei'),
('Michelin'),
('Rizoma'),
('Herramientas'),
('Alpinestars'),
('Sena'),
('Dainese');

-- Asociar etiquetas a productos
INSERT INTO product_tags (product_id, tag_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- Insertar datos en la tabla de carritos
INSERT INTO carts (user_id) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);

-- Insertar datos en la tabla de items del carrito
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 2),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1);