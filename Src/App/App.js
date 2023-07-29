const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const ExpressSession = require("express-session");

const routes = require("./Routes/Routes.js");
const path = require("path");

const Auth = require("./Config/Auth");

class App {
  constructor() {
    this.app = express(); // Define o App
    this.middlewares(); // Sistema de Middlewares
    this.routes(); // Sistema de Rotas
  }

  middlewares() {
    this.app.use(express.json()); // Analisa solicitações de entrada com payloads JSON e é baseado no analisador de corpo (Body Parser).
    this.app.use(express.urlencoded({ extended: true })); // Analisa as solicitações de entrada com cargas úteis codificadas por url e é baseado no analisador de corpo (Body Parser).
    this.app.use(
      ExpressSession({
        secret: Auth.secret,
        resave: true,
        saveUninitialized: true,
      })
    ); // Sessão de Usuário.
    this.app.set("trust proxy", 1); // Não sei, tava na documentação do Express
    this.app.engine("ejs", require("ejs").renderFile); // Função para renderizar variáveis em EJS.
    this.app.set("view engine", "ejs"); // Define EJS como Template Engine.
    this.app.set("views", path.join(__dirname, "../Views/Pages")); // Define o caminho de páginas.
    this.app.use(express.static(path.join(__dirname, "../Views/Public"))); // Define o caminho de estilos, imagens e scripts.
    this.app.use(morgan("dev")); // Mostra requisições no console => :METODO :URL :STATUS :TEMPO-DE-RESPOSTA ms - :res[TAMANHO-DA-REQUISICAO]
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // Indica se a resposta pode ser compartilhada com o código de solicitação da origem fornecida.
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação.
      res.header(
        "Access-Control-Allow-Headers",
        "Access, Content-Type, Authorization, Acept, Origin, X-Requested-With"
      ); // Usado em resposta a uma solicitação de comprovação que inclui Access-Control-Request-Headers para indicar quais cabeçalhos HTTP podem ser usados durante a solicitação real.

      this.app.use(cors()); // Compartilhamento de recursos de origem cruzada (middleware)
      next();
    });
  }

  routes() {
    this.app.use(routes); // Define as rotas da aplicação
  }
}

module.exports = new App().app;
