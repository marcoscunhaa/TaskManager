# :computer: TaskManager

This is a web application developed using Spring Boot (v3.2.3) and Angular (v17.2.1). It allows managing tasks through a user-friendly interface using Bootstrap (v5.3) and has a RESTful API for interaction with the backend.

## :pushpin: Features

* Task management: Creation, editing, deletion, searching, and viewing of tasks.
* Authentication and authorization: Uses Spring Security and JWT token for user authentication.
* Data persistence: Utilizes JPA Repository for interaction with the MySQL database.
* Reactivity: Uses RxJS for asynchronous operations on the frontend.

## :memo: Requirements

* JDK v17.0.10
* Maven v3.9.6
* Docker v4.27.2
* Node.js v21.6.2

## :gear: Configuration and Execution

1. **Backend**:
   
   * Navigate to the `spring-boot` folder.
   * Run `docker-compose up -d` to start the MySQL container.
   * Import the project into your favorite IDE.
   * Start the Spring Boot application.

2. **Frontend**:
   
   * Navigate to the `angular` folder.
   * Run `npm install` to install the dependencies.
   * Run `ng serve` to start the Angular development server.

Access the application at `http://localhost:4200`.

## :bookmark_tabs: API Documentation

The API documentation can be found in the Postman request collection, available at `spring-boot/postman/TaskManager.collection.json`.


