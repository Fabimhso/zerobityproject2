const conn = require("../Config/Connection");
const validator = require("cpf-cnpj-validator");
const date = require("date-and-time");

const { Request, Response } = require("express");
const { BinaryRow } = require("mysql2");

class StudentModel {
	/**
	 * Verifica se a sessão de login e o token existem
	 * Retorna "true" caso a sessão de login e o token não tenham um valor "undefined" atribuído a eles
	 * Retorna "false" caso a sessão de login e o token tenham um valor "undefined" atribuído a eles
	 * 
	 * @param {Request} req Requisição do usuário
	 * @returns {boolean} Sessão login e o token existem ou não
	 */
	IsLoggedIn (req) {
		return (req.session.login === undefined && req.session.token === undefined);
	}

	/**
	 * Faz a busca pelo usuário com as credenciais "email" e "password" no banco de dados
	 * Caso o usuário não exista, retorna um objeto de erro "true", informando o tipo do erro
	 * Caso o usuário seja encontrado, retorna um objeto com erro "false", e a informação de login do usuário
	 * 
	 * @param {string} email email do usuário 
	 * @param {string} password senha do usuário (mínimo de 8 caracteres, 1 letra maiúscula e 1 número)
	 * @returns {Object} Login feito com sucesso ou não
	 */
	async SignIn (email, password) {
		const User = await this.GetAllWhere("alunos", "email = ? AND senha = ?", "", [ email, password ]);

		if (User.length == 0) {
			return {
				Error: true,
				ErrorType: "usernotfound"
			};
		}

		const LoginInfo = {
			Id: User[0].id,
			Name: User[0].nome,
			Email: User[0].email,
			Password: User[0].senha,
			CPF: User[0].cpf,
			RegisteredAt: date.format(User[0].cadastro, "DD/MM/YYYY")
		};

		return {
			Error: false,
			LoginInfo
		};
	}

	/**
	 * Faz a busca pelo usuário com as credenciais "email" e "password" no banco de dados
	 * Caso o usuário exista, redireciona o usuário para uma página de erro
	 * Caso o usuário não exista, faz o cadastro no banco de dados com as informações fornecidas
	 * 
	 * @param {Response} res objeto de resposta
	 * @param {string} name nome do usuário
	 * @param {string} email email do usuário
	 * @param {string} password senha dousuário (mínimo de 8 caracteres, 1 letra maiúscula e 1 número)
	 * @param {string} cpf cpf do usuário (não formatado) Ex: 11122233344
	 * @returns {Response} redirecionamento
	 */
	async SignUp (res, name, email, password, cpf) {
		if (cpf) {
			if (validator.cpf.isValid(cpf)) {
				if (name == "" && email == "" && password == "") {
					return res.redirect("/register?registererror=empyform");
				} else if (name == "") {
					return res.redirect("/register?registererror=noname");
				} else if (email == "") {
					return res.redirect("/register?registererror=noemail");
				} else if (password == "") {
					return res.redirect("/register?registererror=nopasswd");
				} else {
					cpf = validator.cpf.format(cpf);

					const users = await this.GetAllWhere("alunos", "email = ? AND senha = ?", "", [email, password]);

					if (!users.length) {
						await (await conn).execute("INSERT INTO alunos (nome, email, senha, cpf) VALUES (?, ?, ?, ?)", [name, email, password, cpf]);

						return res.redirect("/login");
					} else {
						return res.redirect("/register?registererror=useralreadyexists");
					}
				}
			} else {
				return res.redirect("/register?registererror=invalidcpf");
			}
		} else {
			if (name == "" && email == "" && password == "") {
				return res.redirect("/register?registererror=empyform");
			} else if (name == "") {
				return res.redirect("/register?registererror=noname");
			} else if (email == "") {
				return res.redirect("/register?registererror=noemail");
			} else if (password == "") {
				return res.redirect("/register?registererror=nopasswd");
			} else {
				const users = await this.GetAllWhere("alunos", "email = ? AND senha = ?", "", [email, password]);

				if (!users.length) {
					await (await conn).execute("INSERT INTO alunos (nome, email, senha) VALUES (?, ?, ?)", [name, email, password]);

					return res.redirect("/login");
				} else {
					return res.redirect("/register?registererror=useralreadyexists");
				}
			}
		}
	}

	/**
	 * 
	 * @param {Request} req objeto de requisição
	 * @param {Response} res objeto de resposta
	 * @returns {Response} redireciona o usuario para a pagina principal
	 */
	SignOut (req, res) {
		req.session.login = undefined;
		req.session.token = undefined;
		return res.redirect("/");
	}

	/**
	 * Faz a busca por todos os usuários do banco de dados
	 * 
	 * @param {string} tablename nome da tabela
	 * @param {string} order ordem de busca
	 * @returns {Array<BinaryRow>} usuários do banco de dados
	 */
	async GetAll(tablename, order="") {
		if (!tablename) return new Error("Please specify the 'tablename' paremeter.");

		var [ResultSet, ] = [];

		if (order="") {
			[ResultSet, ] = await (await conn).execute("SELECT * FROM " + tablename);
		} else {
			[ResultSet, ] = await (await conn).execute("SELECT * FROM " + tablename + " ORDER BY " + order);
		}

		return ResultSet;
	}

	/**
	 * Faz a busca por um usuário específico no banco de dados
	 * 
	 * @param {string} tablename nome da tabela
	 * @param {string} where condicao
	 * @param {string} order ordem de busca
	 * @param {string|number} params parametros da query
	 * @returns {Array<BinaryRow} um usuário especifico
	 */
	async GetAllWhere (tablename, where="", order="", params=[]) {
		if (!tablename) return new Error("Please specify the 'tablename' paremeter.");

		var [ResultSet, ] = [];

		if (where == "") {
			if (order == "") {
				[ResultSet, ] = await (await conn).execute("SELECT * FROM " + tablename);
			} else {
				[ResultSet, ] = await (await conn).execute("SELECT * FROM " + tablename + " ORDER BY " + order);
			}
		} else {
			if (order == "") {
				[ResultSet, ] = await (await conn).execute("SELECT * FROM " + tablename + " WHERE " + where, params);
			} else {
				[ResultSet, ] = await (await conn).execute("SELECT * FROM " + tablename + " WHERE " + where + " ORDER BY " + order, params);
			}
		}

		return ResultSet;
	}
}

module.exports = new StudentModel();
