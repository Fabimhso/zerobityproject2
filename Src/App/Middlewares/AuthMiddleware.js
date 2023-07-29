const jwt = require("jsonwebtoken")
const { secret } = require("../Config/Auth")
const { promisify } = require("util")

const { Request, Response, NextFunction } = require("express")

/**
 * Verifica se o token de sessão tem um valor definido
 * Se não, o usuário é redirecionado para uma página de erro (Falha na Autorização)
 * 
 * Se o token existir, o método faz a decodificação dele, com base no "secret" informado
 * Se a decodificação falhar, o usuário é redirecionado para uma página de erro (Token Inválido)
 * Caso o token não consiga ser decodificado, o usuário é redirecionado para uma página de erro (Token Expirado)
 * 
 * Caso o a decodificação não falhe e o token seja decodificado com sucesso, a ação continua (no Controller, Definido dem Routes.js)
 * 
 * @param {Request} req objeto de requisição
 * @param {Response} res objeto de resposta
 * @param {NextFunction} next middleware
 * @returns {Promise<Respone|NextFunction>} redirecionamento | continuação de ação
 */
module.exports = async (req, res, next) => {
  const auth = req.session.token

  if (auth == undefined) {
    return res.status(401).json({
      erro: true,
      code: 130,
      mensagem: "Falha na autorização."
    })
  }

  const [, token] = auth.split(" ")

  try {
    const decoded = await promisify(jwt.verify)(token, secret)

    if (!decoded) {
      return res.status(401).json({
        erro: true,
        code: 130,
        mensagem: "Token expirado."
      })
    }

    req.user_id = decoded.id
    
    return next()
  } catch (err) {
    return res.status(401).json({
      erro: true,
      code: 130,
      mensagem: "Token inválido."
    })
  }
}