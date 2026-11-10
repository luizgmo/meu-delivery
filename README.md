# Meu Delivery

Aplicação de delivery de marmitas com back end Spring Boot e front end Angular, organizados em um monorepo.

## Estrutura

```
.
├── backend/    # Spring Boot (Java 21, Spring Data JPA, MySQL)
└── frontend/   # Angular 21 (standalone components, Vitest)
```

## Back end

Requisitos: Java 21 e MySQL em `localhost:3307`, base `delivery`.

Com o MySQL em execução, crie e popule o banco `delivery` antes de iniciar a aplicação:

```sh
cd backend
./database-reset.sh
./gradlew bootRun
```

Execute `./database-reset.sh` novamente apenas quando quiser recriar o banco e restaurar os dados de exemplo.

API em <http://localhost:8080>.

### Endpoints

| Método | Rota                 | Descrição            |
| ------ | -------------------- | -------------------- |
| GET    | `/api/prato`       | Lista pratos       |
| POST   | `/api/prato`       | Cria prato         |
| GET    | `/api/prato/{id}`  | Busca prato por ID |
| PUT    | `/api/prato/{id}`  | Atualiza prato     |
| DELETE | `/api/prato/{id}`  | Remove prato       |
| GET    | `/api/cliente`       | Lista clientes       |
| POST   | `/api/cliente`       | Cria cliente         |
| GET    | `/api/cliente/{id}`  | Busca cliente por ID |
| PUT    | `/api/cliente/{id}`  | Atualiza cliente     |
| DELETE | `/api/cliente/{id}`  | Remove cliente       |
| GET    | `/api/pedido`        | Lista pedidos        |
| GET    | `/api/pedido/{id}`   | Detalha pedido       |

## Front end

```sh
cd frontend
npm install
npm start
```

Aplicação em <http://localhost:4200>.

### Funcionalidades

- Pratos: listar, detalhar, criar, editar e excluir
- Clientes: listar, detalhar, criar, editar e excluir
- Pedidos: listar e detalhar itens, quantidades, preços e total
- Valores em BRL e datas no formato pt-BR

## Testes

```sh
# Na pasta backend
./gradlew test

# Na pasta frontend
npm test -- --watch=false
```

## Modelo da disciplina

Este projeto mantém a estrutura, as tecnologias e as funcionalidades da loja desenvolvida na disciplina. Produtos foram adaptados para pratos do cardápio, mantendo descrição e preço. Clientes, pedidos e itens de pedido seguem o mesmo modelo, assim como as páginas Thymeleaf do backend e as telas Angular do frontend.

O banco utilizado é `delivery`, separado do banco `loja`. O script `database-reset.sh` apaga e recria somente o banco `delivery`. Ele mantém a referência ao contêiner MySQL `lojadb` usado na disciplina, caso precise iniciá-lo com Podman.

Assim como no projeto original, pedidos são consultados pela aplicação; os pedidos de exemplo são cadastrados pelo arquivo `data.sql`. As portas continuam sendo 8080 no backend e 4200 no frontend: execute um projeto por vez.

## MySQL na porta 3306

Caso seu MySQL local use a porta 3306, crie o banco com os comandos abaixo a partir de `backend/` (a senha será solicitada):

```sh
mysql --protocol=tcp --host=127.0.0.1 --port=3306 --user=root -p < src/main/resources/schema.sql
mysql --protocol=tcp --host=127.0.0.1 --port=3306 --user=root -p < src/main/resources/data.sql
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/delivery ./gradlew bootRun
```

Os scripts SQL recriam o banco `delivery`. A configuração padrão continua usando a porta 3307, como no projeto da disciplina.
