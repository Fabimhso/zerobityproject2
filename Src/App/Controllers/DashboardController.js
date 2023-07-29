const Dashboard = require("../Models/DashboardModel");
const Student = require("../Models/StudentModel");

class DashboardController {
  async RenderMain(req, res) {
    const courses = await Dashboard.GetCursos(req.session.login.Id);

    return res.json({
      login: req.session.login,
      courses,
    });

    // return res.render("biblioteca", {
    // login: req.session.login,
    // cursos
    // })
  }
}

module.exports = new DashboardController();
