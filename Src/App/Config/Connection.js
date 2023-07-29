const mysql = require("mysql2/promise")
const connections = require("./DatabaseConfig")

async function connectMySQL () {
	var connection

	try {
		connection = await mysql.createConnection(connections.mysql)
		console.log("| Successfully connected with MySQL |\n=====================================")
		return connection
	} catch (err) {
		console.log(`=====================================\nAn error occurred when trying to connect with MySQL:\n${err}`)
	}
}

module.exports = connectMySQL()