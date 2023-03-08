# vendas_microservices
Microsserviços em Java e NodeJS que compõem um sistema de vendas de produtos e que se comunicam via HTTP e AMQP (RabbitMQ).

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Tecnologias utilizadas
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

# Rodando o projeto

Clone o repositório:

```sh
git clone https://github.com/SamuelFST/vendas_microservices.git
```

No diretório raiz do projeto, rode o seguinte comando para o Docker fazer o build das aplicações e iniciar todos os contêineres necessários:

```sh
docker-compose up --build
```

# Acessando as APIs

Após todos os contêineres serem criados, as APIs poderão ser acessadas individualmente ou via gateway, que estará em disponível em [localhost:10000](http://localhost:10000). A conexão do gateway com as APIs poderá ser verificada fazendo uma requisição GET em [localhost:10000/api/connect](http://localhost:10000/api/connect).

# Documentação

Toda a documentação dos endpoints das APIs estará disponível em [localhost:10000/api-docs](http://localhost:10000/api-docs).
