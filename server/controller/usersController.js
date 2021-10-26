/*
  O controlador é a parte que cuida do processamento da solicitação do cliente,
  que lida com a solicitação HTTP e retorna uma resposta.
  A resposta pode ser um JSON se você estiver chamando um endpoint de API
*/

// aqui vai o código que valida as ações da rota e utiliza o objeto 'db' que veio dos models configurados.
// Toda função que responde a uma chamada da API/Browser trabalha com duas variaveis/objetos
// 1ª req pode ser qualquer nome a variavel, mas ela vai representar
// a requisição e é sempre a primeira posição.
// 2ª res pode ser qualquer nome a variavel, mas ela vai representar
// a resposta e é sempre a segunda posição.

const db = require('../db/models')
 
// https://sequelize.org/master/manual/model-querying-basics.html
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
 
// O find one retorna um unico objeto e não um array como o findAll
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
    console.log(error)
    res.status(502)
    res.send(error)
  });
}
 
/*
 * https://sequelize.org/master/manual/model-instances.html#creating-an-instance
   Da olhada na documentação do sequelize para entender como manipular as instâncias.
   De uma maneira geral, uma estância está sempre associado a uma linha/tupla de dados do banco.
 */
const postUsers = (req, res) => {
 
  const userToCreate = req.body;
 
  /* Coisas a se fazer aqui:
   1. Validar os dados para garantir que tudo foi informado da maneira correta.
      Se algo estiver errado é costutme retorna um status code 400 informando uma lista de erros.
      O swagger originla espera algo nesse formato aqui
      {
        "code": "string",
        "message": "string"
      }
      Podemos utilizar o próprio sequelize para validar.
      https://sequelize.org/master/manual/validations-and-constraints.html
 
   2. Criptografar a senha do usuário, para que não fique aberta no banco de dados para todo mundo ver.  
  */
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
// https://sequelize.org/master/manual/model-instances.html#deleting-an-instance
// apagamos aonde o id for igual ao indicado
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