export APP_MEMORY=${1:-"256m"}
export CONSUL_CNS=${2:-"exchange-consul"}
export MYSQL_PASSWORD=${3:-"password"}
export RABBITMQ_PASSWORD=${4:-"guest"}
export TRITON_DC=$(triton profile get | awk -F"/" '/url:/{print $3}' | awk -F'.' '{print $1}')
export TRITON_ACCOUNT=$(triton account get | awk -F": " '/id:/{print $2}')
