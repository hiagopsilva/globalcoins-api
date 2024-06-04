# Backend do Projeto

Este é o backend do projeto, desenvolvido com Nest.js e TypeScript. Ele usa Docker para a contêinerização das aplicações PostgreSQL (banco relacional) e MongoDB (banco não relacional). O Swagger é utilizado para a documentação da API e o TypeORM é utilizado como ORM para interagir com os bancos de dados.

## Configuração do Ambiente

Antes de começar, certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.

1. Clone este repositório:

    ```
    git clone https://github.com/hiagopsilva/globalcoins-api.git
    ```

2. Navegue até o diretório do projeto:

    ```
    cd globalcoins-api
    ```

3. Crie um arquivo `.env` com as variáveis de ambiente necessárias para a configuração do projeto. (Deixei o `env.example` para facilitar esse passo a passo).

4. Inicie os contêineres do Docker usando o Docker Compose:

    ```
    docker-compose up --build
    ```

5. Execute as migrations do TypeORM para criar as tabelas necessárias nos bancos de dados:
    ```
      yarn migration:run
    ```
    ou

    ```
    export NODE_ENV=DEV && typeorm-ts-node-esm migration:run -d ./data-source.ts
    ```

## Acessando o Swagger

Após iniciar os contêineres do Docker e executar as migrações, você pode acessar a documentação da API Swagger:

1. Abra seu navegador e acesse [http://localhost:3333/api](http://localhost:3333/api).

## Funcionalidades

O backend inclui as seguintes funcionalidades:

- CRUD do usuário.
- Visualizar as 10 moedas.
- Favoritar moedas.
- Visualizar o histórico de cotação de moedas.
- Atualização de dados RealTime.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
