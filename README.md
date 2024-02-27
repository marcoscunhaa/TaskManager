# :computer: TaskManager

Trata-se de uma aplicação web desenvolvida com Spring Boot(v3.2.3) e Angular(v17.2.1).  Permite gerenciar tarefas através de uma interface amigável utilizando Bootstrap(v5.3) e possui uma API RESTful para interação com o backend.

## :pushpin: Funcionalidades

- Gerenciamento de tarefas: Criação, edição, exclusão, pesquisa e visualização de tarefas.
- Autenticação e autorização: Utiliza Spring Security e JWT token para autenticação de usuários.
- Persistência de dados: Utiliza JPA Repository para interação com o banco de dados MySQL.
- Reatividade: Utiliza RxJS para operações assíncronas no frontend.

## :memo: Pré-requisitos

- JDK v17.0.10
- Maven v3.9.6
- Docker v4.27.2
- Node.js v21.6.2

## :gear: Configuração e Execução

1. **Backend Spring Boot**:
   
   - Navegue até a pasta `spring-boot`.
   - Execute `docker-compose up -d` para iniciar o contêiner do MySQL.
   - Importe o projeto em sua IDE favorita.
   - Inicie a aplicação Spring Boot.

2. **Frontend Angular**:
   
   - Navegue até a pasta `angular`.
   - Execute `npm install` para instalar as dependências.
   - Execute `ng serve` para iniciar o servidor de desenvolvimento do Angular.

Acesse a aplicação em `http://localhost:4200`.

## :bookmark_tabs: Documentação da API

A documentação da API pode ser encontrada na coleção de requisições do Postman, disponível em `spring-boot/postman/TaskManager.collection.json`.
