const Student = require("../Models/StudentModel");
const Auth = require("../Config/Auth");
const jwt = require("jsonwebtoken");

const { Request, Response } = require("express");

class LoginController {
  /**
   * Função para renderizar a página de login
   *
   * Caso o usuário não esteja logado, a página de login é renderizada normalmente.
   * Caso contrário, o usuário é redirecionado para a página da biblioteca
   *
   * @param { Request } req objeto de requisição
   * @param { Response } res objeto de resposta
   * @returns { Promise<Response> } redirecionamento
   */
  async Render(req, res) {
    if (Student.IsLoggedIn(req) === false) return res.redirect("/dashboard");

    if (req.query.loginerror != undefined) {
      return res.render("signin", {
        login: req.session.login,
        erro: true,
        type: req.query.loginerror,
      });
    }

    return res.render("signin", {
      login: req.session.login,
      erro: false,
    });
  }

  /**
   * Função que administra o POST da página de login
   *
   * @param { Request } req objeto de requisição
   * @param { Response } res objeto de resposta
   * @returns { Promise<Response> } redirecionamento
   */
  async Index(req, res) {
    const { email, password } = req.body;

    const login = await Student.SignIn(email, password);

    if (login.Error == true)
      return res.redirect("/entrar?loginerror=" + login.ErrorType);

    const UserLogin = {
      user: login.LoginInfo,
      token: jwt.sign(
        {
          id: login.LoginInfo.UserId,
        },
        Auth.secret,
        {
          expiresIn: Auth.expireIn,
        }
      ),                    
    };

    req.session.token = "Bearer " + UserLogin.token;
    req.session.login = UserLogin.user;

    return res.redirect("/dashboard");
  }
}

module.exports = new LoginController();
