const connection = require("../Config/Connection");

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

class HomeModel {
	/**
	 * @returns {Curso[]}
	 */
	async GetCursos () {
		var categories_arr = [], courses_arr = [], technologies_arr = [];

		const [categories, ] = await (await connection).execute("SELECT * FROM categorias");

		for (let i = 0; i < categories.length; i++) {
			let categoria_id = categories[i].id;
			const [courses, ] = await (await connection).execute("SELECT * FROM cursos WHERE categoria_id = ?", [categoria_id]);
			
			if (courses[0] === undefined) continue
			categories_arr.push(categories[courses[0].categoria_id - 1]);
			
			for (let j = 0; j < courses.length; j++) courses_arr.push({ curso: courses[j], link: courses[j].slug });
		}

		const [technologies, ] = await (await connection).execute("SELECT * FROM tecnologias");

		for (let i = 0; i < technologies.length; i++) technologies_arr.push(technologies[i]);

		return [categories_arr, courses_arr, technologies_arr];
	}
}

module.exports = new HomeModel();