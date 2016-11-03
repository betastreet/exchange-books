## Development Environment Instructions

- ensure the latest version of Docker is installed
- Navigate to the project directory
- copy docker-compose.override.example to docker-compose.override.yml and modify as needed
- Run "docker-compose -p books up -d" to bring up the containers
- Run "docker-compose -p books ps" to list the containers
- Run "docker exec -it books_api_1 sh" to run commands in a container's shell
- Run "docker-compose -p books stop" to stop the containers
