const conn = require("../Config/Connection");
const Utils = require("../Utils/Utils");

/**
 * Objeto de tipo Curso
 * @typedef {Object} Curso
 * @property {Array<BinaryRow>} _curso
 * @property {number} _total
 * @property {number} _assistidas
 * @property {number} _porcentagem
 * @property {String} _link
 * @property {boolean} _emissao
 */

class DashboardModel {
  /**
   * Retorna todos os cursos de um usuário com base no Id dele
   * 
   * @param {number} loginId Id do login do usuário
   * @returns {Curso[]} Cursos que o usuário possui na conta
   */
  async GetCursos(loginId) {
    var courses = [], info = [];

    let [coursesControl, ] = await (await conn).execute("SELECT * FROM controle_cursos WHERE aluno_id = ? ORDER BY curso_id", [loginId]);

    for (let i = 0; i < coursesControl.length; i++) {
      let [course, ] = await (await conn).execute("SELECT * FROM cursos WHERE id = ? ORDER BY id ASC", [coursesControl[i].curso_id]);
      for (let j = 0; j < curso.length; j++) courses.push(course[j]);
    }

    for (let i = 0; i < courses.length; i++) {
      let [total, ] = await (await conn).execute("SELECT * FROM cursos_aulas WHERE curso_id = ?", [courses[i].id]);
      let [watched, ] = await (await conn).execute("SELECT * FROM aulas_assistidas WHERE curso_id = ?", [courses[i].id]);
      let percentage = Utils.Percentage(watched.length, total.length);

      info.push({
        _curso: courses[i],
        _total: total.length,
        _assistidas: watched.length,
        _porcentagem: percentage,
        _link: Utils.Text2Slug(cursos[i].nome),
        _emissao: percentage === 100 // "true" ou "false"
      });
    }

    return info;
  }
}

module.exports = new DashboardModel();