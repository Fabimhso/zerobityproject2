const router = require("express").Router();

const Home = require("../Controllers/HomeController");
const Login = require("../Controllers/LoginController");
const Register = require("../Controllers/RegisterController");
const Dashboard = require("../Controllers/DashboardController");
const Account = require("../Controllers/AccountController");

const AuthMiddleware = require("../Middlewares/AuthMiddleware");

router.get("/", Home.RenderHome);
router.get("/entrar/", Login.Render);
router.get("/cadastrar/", Register.Render);
router.get("/sair/", Home.SignOut);

router.get("/loja/", Home.RenderStore);
router.get("/carrinho/", Home.RenderCart);

router.post("/entrar/", Login.Index);
router.post("/cadastrar/", Register.Index);

module.exports = router;
