# Teste backend IBM

## Descrição do projeto

Criar um microserviço com os seguintes endpoints após consumir os dados dos mocks acima e retornar o que está sendo solicitado:

1.  GET: /compras - Retornar a lista de compras ordenadas de forma crescente por valor
2.  GET: /maior-compra/ano - (Exemplo: /maior_compra/2016) - Retornar a maior compra do ano informado com dados da compra
3.  GET: /clientes-fieis - Retornar o Top 3 clientes mais fiéis, clientes que possuem mais compras recorrentes com maiores valores.
4.  GET: /recomendacao/cliente/tipo - Retornar uma recomendação de vinho baseado nos tipos de vinho que o cliente mais compra

## Tecnologias utilizadas

- Node 18
- Express
- Typescript
- Jest
- Tsyringe

## Como rodar o projeto

1. Clone o repositório
2. Instale as dependências com `npm i`
3. Rode o projeto com `npm start`
4. Acesse o projeto em `http://localhost:3000`
