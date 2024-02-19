-- Criar a tabela users
CREATE TABLE users (
    id NUMBER PRIMARY KEY,
    email VARCHAR2(255) UNIQUE NOT NULL,
    full_name VARCHAR2(255) NOT NULL,
    password VARCHAR2(255) NOT NULL,
    image_profile BLOB
);

-- Criar a tabela tasks
CREATE TABLE tasks (
    id NUMBER PRIMARY KEY,
    assigned_user NUMBER NOT NULL,
    title VARCHAR2(255) NOT NULL,
    priority VARCHAR2(50) NOT NULL,
    status VARCHAR2(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    FOREIGN KEY (assigned_user) REFERENCES users(id)
);

-- Criar sequências
CREATE SEQUENCE users_seq START WITH 1 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE tasks_seq START WITH 1 INCREMENT BY 1 NOCACHE;
