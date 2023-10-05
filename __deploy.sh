"
# command for starting the container in watch mode.

docker compose -f docker-compose-dev.yaml --env-file .\services\api\.env up --build --wait && docker compose -f docker-compose-dev.yaml  --env-file .\services\api\.env alpha watch && cls && echo `Container Running in watch Mode`

"