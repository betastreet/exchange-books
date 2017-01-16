## Development Environment Instructions

- Ensure the latest version of Docker & Docker Compose are installed
- Navigate to the project directory
- Copy docker-compose.override.example to docker-compose.override.yml and modify as needed
- Run "docker-compose -p books up -d" to bring up the containers
- Run "docker-compose -p books ps" to list the containers
- Run "docker-compose -p books logs -f" to output logs from the containers
- Run "docker exec -it books_api_1 sh" to run commands in a container's shell
- Run "docker exec -it books_database_1 mysql -uuser -ppassword" to enter the database command line.
- Run "docker-compose -p books stop" to stop the containers

You may need to run the following to migrate and run seeds:

```sh
$ docker exec books_api_1 npm run migrate

$ docker exec books_api_1 npm run seed
```

## Endpoints

See [endpoints.curl](endpoints.curl).

## Deployment

Deploy on Joyent Triton by running the following:

```bash
source ./triton_env.sh "256m" "exchange-consul" "my_mysql_password" "my_rabbitmq_password" && docker-compose -f triton-compose.yml up -d
```
