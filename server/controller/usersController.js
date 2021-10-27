/*
  O controler é a parte que cuida do processamento da solicitação do cliente,
  que lida com a solicitação HTTP e retorna uma resposta.
  A resposta pode ser um JSON se você estiver chamando um endpoint de API

  aqui vai o código que valida as ações da rota e utiliza
  o objeto 'db' que veio dos models configurados.
  Toda função que responde a uma chamada da API/Browser trabalha com duas variaveis/objetos
  1ª req pode ser qualquer nome a variavel, mas ela vai representar
  a requisição e é sempre a primeira posição.
  2ª res pode ser qualquer nome a variavel, mas ela vai representar
  a resposta e é sempre a segunda posição.
*/

const db = require('../db/models')

// FindAll lista toda a tabela do banco de dados.
const getUsers = (req, res) => {
  db.user.findAll({
    attributes: {
      exclude: ['password']
    }
  }).then((allUsers) => {
    res.send(allUsers)
  }).catch((error) => {
    res.status(502)
    res.send(error)
  })
}
 
// O findOne retorna um unico objeto e não um array como o findAll
const getUserUid = (req, res) => {
  db.user.findOne({
    where: {
      id: req.params.uid
    },
    attributes: {
      exclude: ['password']
    }
  }).then((oneUser) => {
    res.status((oneUser) ? 200 : 404)
    res.send(oneUser)
  }).catch((error) => {
    res.status(502)
    res.send(error)
  });
}
 

const postUsers = (req, res) => {
  const userToCreate = req.body;
  db.user.create(userToCreate).then((createdUser) => {
    if (createdUser) {
      const jsonResponse = createdUser.toJSON()
      delete jsonResponse.password
      res.status(201)
      res.send(jsonResponse)
    } else {
      res.status(400)
      res.send(createdUser)
    }
  }).catch((erro) => {
    res.status(502)
    res.send(erro)
  })
}

// Atualizar um usuário
const putUserUid = (req, res) => {
 
  // Primeiro eu localizo o usuário alvo.
  db.user.findOne({
    where: {
      id: req.params.uid
    },
    attributes: {
      exclude: ['password']
    }
  }).then((userToUpdate) => {
 
    if (userToUpdate) {
      // Se achar o usuário, eu troco somente o nome e o papel dele.
      // De novo, assim como no create pode validar os dados aqui.
      userToUpdate.name = req.body.name;
      userToUpdate.role = req.body.role;
 
      userToUpdate.save().then((result) => {
        console.log(result)
        res.send(userToUpdate)
      }).catch((erro) => {
        res.status(400)
        res.send(erro)
      })
 
    } else {
      // Aqui só acontece quando não acho o ID do usuario no banco
      res.status(404)
      res.send()
    }
 
  }).catch((erro) => {
    res.status(502)
    res.send(erro)
  })
 
 
}

const deleteUserUid = (req, res) => {
  db.user.destroy({
    where: {
      id: req.params.uid
    }
  }).then(() => {
    res.status(204)
    res.send()
  }).catch((error) => {
    res.status(502)
    res.send(error)
  });
}

module.exports = { getUsers, postUsers, getUserUid, putUserUid, deleteUserUid }