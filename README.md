# Games Catalog

O **Games Catalog** é um projeto fullstack que desenvolvi para praticar Node.js, Express e MongoDB. A ideia é criar um sistema simples para cadastrar, listar, editar e remover jogos — algo útil tanto para quem quer organizar uma coleção quanto para estudar os conceitos de CRUD, rotas REST e EJS no frontend.

## Funcionalidades

* **Adicionar jogos**: Crie novos cadastros com título, gênero, desenvolvedor e data de lançamento.
* **Listar jogos**: Veja todos os jogos cadastrados em uma visualização organizada.
* **Editar informações**: Atualize os dados de um jogo já existente.
* **Remover jogos**: Exclua jogos do catálogo com facilidade.

## Tecnologias Utilizadas

* **JavaScript** como linguagem principal
* **Express.js** no backend
* **MongoDB** com Mongoose para o banco de dados
* **EJS** como template engine para as views
* **Dotenv** para variáveis de ambiente
* **Nodemon** para reinício automático durante o desenvolvimento
* **Method-Override** para permitir métodos PUT e DELETE via formulários HTML

## Como Executar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/devRafaelFagundes/games-catalog.git
   ```

2. **Entre no diretório**:

   ```bash
   cd games-catalog
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```

4. **Configure o arquivo `.env`**:
   Crie um `.env` com as variáveis:

   ```
   MONGO_URI=mongodb://localhost:27017/games-catalog
   PORT=3000
   ```

5. **Rode o servidor**:

   ```bash
   npm start
   ```

6. **Abra no navegador**:
   Vá para `http://localhost:3000`

## Estrutura do Projeto

* `server.js`: Arquivo principal que sobe o servidor
* `routes/`: Rotas da aplicação
* `models/`: Schemas do Mongoose
* `views/`: Templates EJS
* `public/`: Arquivos estáticos (CSS, imagens etc.)

## Contribuindo

Fique à vontade para sugerir melhorias, reportar bugs ou adicionar novas funcionalidades!

1. Faça um fork do projeto
2. Crie uma branch:

   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commits
4. Envie para o seu fork:

   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request aqui no repositório original

## Licença

Distribuído sob a [Licença MIT](LICENSE).

---

Projeto feito com foco em aprendizado e com bastante carinho por quem curte desenvolvimento e jogos. 🎮
