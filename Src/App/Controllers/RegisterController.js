const Student = require("../Models/StudentModel");

class RegisterController {
  async Render(req, res) {
    if (Student.IsLoggedIn(req)) return res.redirect("/biblioteca");

    if (req.query.registererror != undefined) {
      return res.render("signup", {
        login: req.session.login,
        erro: true,
        type: req.query.loginerror,
      });
    }

    return res.render("signup", {
      login: req.session.login,
      erro: false,
    });
  }

  async Index(req, res) {
    const { nome: name, email, senha: password, cpf } = req.body;

    Student.SignUp(res, name, email, password, cpf);
  }
}

module.exports = new RegisterController();
