# API VetCare

API RESTful para gerenciamento de atendimentos veterinários.

## Desenvolvido por

Fernando José Toledo Schwab

## Tecnologias

- Node.js, Express, Sequelize, MySQL, JWT, Swagger

## Instalação

```bash
npm install
```

## Banco de Dados

Suba o banco de dados com Docker:

```bash
docker compose up -d
```

Configure as variáveis de ambiente copiando o arquivo de exemplo:

```bash
cp .env.example .env
```

Preencha os valores no arquivo `.env`.

## Execução

Desenvolvimento:

```bash
npm run dev
```

Produção:

```bash
npm start
```

## Documentação

Gerar/atualizar a documentação Swagger:

```bash
npm run swagger
```

Acessar a documentação no navegador:

```
http://localhost:3000/api-docs
```
