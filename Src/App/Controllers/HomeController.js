const Home = require("../Models/HomeModel");
const Student = require("../Models/StudentModel");

class HomeController {
  async RenderHome(req, res) {
    const [categories, courses, technologies] = await Home.GetCursos();

    return res.render("home", {
      login: req.session.login,
      categories,
      courses,
      technologies,
    });
  }

  async RenderStore(req, res) {
    const [categories, courses, ] = await Home.GetCursos();

    return res.render("store", {
      login: req.session.login,
      categories, courses,
    });
  }

  async SignOut(req, res) {
    Student.SignOut(req, res);
  }

  async RenderCart(req, res) {}
}

module.exports = new HomeController();
