# :computer: TaskManager

This is a web application developed using Spring Boot (v3.2.3) and Angular (v17.2.1). It allows managing tasks through a user-friendly interface and has a RESTful API for interaction with the backend.

## :four_leaf_clover: Features

* Task management: Creation, editing, deletion, searching, and viewing of tasks.
* RESTful API: Provides endpoints for seamless interaction with the backend.
* Data persistence: Utilizes JPA Repository with Hibernate for interaction with the MySQL database, automatically generating tables.
* Authentication and authorization: Uses Spring Security and JWT token for user authentication.
* Performance: Implements lazy loading techniques for optimized data loading and performance.
* Reactivity: Uses RxJS for asynchronous operations on the frontend.
* Responsiveness: Utilizes Bootstrap(v5.3) for creating a responsive user interface, ensuring compatibility across various devices and screen sizes.
* Docker Support: Easily deployable using Docker containers for MySql database.

## :memo: Requirements

* JDK v17.0.10
* Maven v3.9.6
* Docker v4.27.2
* Node.js v20.12.0

## :play_or_pause_button: Configuration and Execution

1. **Backend**:
   
   * Navigate to the `spring-boot` folder.
   * Run `mvn clean install` to download dependencies and build the project.
   * Import the project into your favorite IDE.
   * Start the Spring Boot application.

2. **Frontend**:
   
   * Navigate to the `angular` folder.
   * Run `npm install` to install the dependencies.
   * Run `ng serve` to start the Angular development server.

Access the application at `http://localhost:4200`.

## :bookmark_tabs: API Documentation

The API documentation can be found in the Postman request collection, available at `spring-boot/postman/TaskManager.collection.json`



# 
