const Student = require("../Models/StudentModel");

class AccountController {
  async RenderMain(req, res) {
    if (Student.IsLoggedIn(req) == false)
      return res.redirect("/login?goto=account");

    return res.render("account", {
      login: req.session.login,
    });
  }
}

module.exports = new AccountController();
