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
    image_url TEXT,
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

-- Insertar ejemplo de usuario
INSERT INTO users (name, email, password) 
VALUES ('John Doe', 'john@example.com', '123456789');

-- Insertar ejemplo de categoría
INSERT INTO categories (name, description) 
VALUES ('Accesorios de Rendimiento', 'Mejora el rendimiento de tu moto');

-- Insertar ejemplo de producto
INSERT INTO products (name, description, price, image_url, category_id) 
VALUES ('Escape Akrapovic', 'Escape de alto rendimiento en fibra de carbono', 1200.00, 'url_to_image', 1);

-- Insertar ejemplo de etiqueta
INSERT INTO tags (name) 
VALUES ('Akrapovic');

-- Asociar etiqueta a producto
INSERT INTO product_tags (product_id, tag_id) 
VALUES (1, 1);

-- Crear ejemplo de carrito para usuario
INSERT INTO carts (user_id) 
VALUES (1);

-- Añadir producto al carrito
INSERT INTO cart_items (cart_id, product_id, quantity) 
VALUES (1, 1, 2);
