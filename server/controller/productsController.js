// aqui vai o código que acessa o banco de dados
const db = require("../db/models");

const getProducts = (req, res) => {
  db.products
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
  db.products
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
      res.status(502);
      res.send(error);
    });
};

module.exports = { getProducts, getProductUid };
