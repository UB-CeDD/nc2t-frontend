
# NCCT Frontend

This is the frontend for the NCCT project. It is a React application built with Vite.

## Development

To run the frontend in a development environment, you will need to have Docker and Docker Compose installed.

1.  **Build and run the containers:**

    ```bash
    docker-compose up --build
    ```

2.  **Access the application:**

    The frontend will be available at [http://localhost:5173](http://localhost:5173).

## Production

To build a production-ready image, you can use the `docker build` command.

```bash
docker build -t ncct-frontend .
```

This will create a Docker image with the built application served by Nginx.
