#!/bin/bash
#
# Este script inicia o serviço do MySQL e recria somente o banco delivery e carrega os dados de exemplo.
#

check_file() {
	file=$1
	if [ ! -f $file ]; then
		echo "File not found: $file"
		exit 1
	fi
}

mysql_ping() {
        mysql --protocol=tcp --port=3307 --user=root --password=root -e "SELECT 1" &> /dev/null
}

mysql_start() {
        if [ "$USER" = "aluno" ]; then
	    sudo /bin/systemctl start mysql.service
        else
            podman start lojadb 1> /dev/null
        fi
}


readonly SCHEMA_FILE="src/main/resources/schema.sql"
readonly DATA_FILE="src/main/resources/data.sql"

# Os arquivos existem?
check_file $SCHEMA_FILE
check_file $DATA_FILE


# Iniciando o serviço do MySQL
if ! mysql_ping; then
    echo -n "Starting MySQL..."
    mysql_start

    # Waiting MySQL to start
    while ! mysql_ping; do
        echo -n "."
        sleep 0.1
    done
    echo "Done!"
else
    echo "MySQL is running."
fi


# Criando o banco de dados
echo "Creating database schema..."
mysql --protocol=tcp --port=3307 --user=root --password=root < $SCHEMA_FILE

# Carregando dados
echo "Loading data..."
mysql --protocol=tcp --port=3307 --user=root --password=root < $DATA_FILE

