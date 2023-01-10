INSERT INTO categories (id, description) VALUES (1, 'Books');
INSERT INTO categories (id, description) VALUES (2, 'Movies');
INSERT INTO categories (id, description) VALUES (3, 'Games');

INSERT INTO suppliers (id, name) VALUES (1, 'Book Supplier');
INSERT INTO suppliers (id, name) VALUES (2, 'Game Supplier');
INSERT INTO suppliers (id, name) VALUES (3, 'Movie Supplier');

INSERT INTO products (id, name, quantity_available, supplier_id, category_id) VALUES (1, 'Book placeholder', 10, 1, 1);
INSERT INTO products (id, name, quantity_available, supplier_id, category_id) VALUES (2, 'Game placeholder', 25, 2, 3);
INSERT INTO products (id, name, quantity_available, supplier_id, category_id) VALUES (3, 'Movie placeholder', 3, 3, 2);

