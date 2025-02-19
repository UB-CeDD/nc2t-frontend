# NCCT Project - Frontend

This directory contains the **React frontend** for the NCCT Project. It uses Docker and Docker Compose to containerize the application, making it easy to set up and run in any environment.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Setup and Running the Frontend](#setup-and-running-the-frontend)
4. [Development Workflow](#development-workflow)
5. [Technologies Used](#technologies-used)
6. [License](#license)
7. [Contributing](#contributing)

---

## Project Structure
```angular2html
frontend/
├── Dockerfile
├── entrypoint.sh
├── package.json # Base package.json
├── node_modules/ # Created automatically
├── public/
├── src/
└── tsconfig.json

```
---

## Prerequisites

Before running the frontend, ensure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup and Running the Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
    ```
2. **Start the frontend**: 
    Run the following command to build and start the Docker containers:  
    ```bash
    docker-compose build
    docker-compose up
    ```
    This will:  
      - Initialize the React frontend.
3. **Access the React Frontend**: 
      - React Frontend: http://localhost:3000
      - React Frontend (with hot-reloading): http://localhost:3000
- **Stop the frontend**: To stop the containers, run:  
    ```bash
    docker-compose down
    ```
    This will stop the containers and remove the containers, networks, volumes, and images created by `docker-compose up`.

## Development Workflow**: 
- The React project is automatically created in the src directory.
- You can make changes to the React project and see the changes reflected in real-time in the browser.
---
## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds optional types to the language.
- **Docker**: A platform for developing, shipping, and running applications in containers.
- **Docker Compose**: A tool for defining and running multi-container Docker applications.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **npm**: A package manager for Node.js packages.
- **React Router**: A collection of navigational components for React applications.

---
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
## Contributing
Contributions are welcome! Please see the [Contributing Guidelines](CONTRIBUTING.md).
``` 
[]: # (END)