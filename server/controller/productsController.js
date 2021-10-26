/*
  O controlador é a parte que cuida do processamento da solicitação do cliente,
  que lida com a solicitação HTTP e retorna uma resposta.
  A resposta pode ser um JSON se você estiver chamando um endpoint de API
*/

// aqui vai o código que acessa o banco de dados

const db = require("../db/models");

const getProducts = (req, res) => {
  db.product
    .findAll()
    .then((allProducts) => {
      res.send(allProducts);
    })
    .catch((error) => {
      res.status(502);
      res.send(error);
    });
};

const getProductUid = (req, res) => {
  db.product
    .findOne({
      where: {
        id: req.params.uid,
      }
    })
    .then((oneProduct) => {
      res.status(oneProduct ? 200 : 404);
      res.send(oneProduct);
    })
    .catch((error) => {
      console.log(error);
      res.status(502);
      res.send(error);
    });
};

module.exports = { getProducts, getProductUid };
