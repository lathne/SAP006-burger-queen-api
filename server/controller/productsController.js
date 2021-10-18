/*
  O controlador é a parte que cuida do processamento da solicitação do cliente,
  que lida com a solicitação HTTP e retorna uma resposta.
  A resposta pode ser um JSON se você estiver chamando um endpoint de API
*/

// aqui vai o código que acessa o banco de dados
const getAllProducts = async (req, res) => {
  res.status(200).send({
    messsage: 'Usando o GET dentro da rota de produtos',
  });
};

const postProducts = (req, res) => {
  // validar body
  res.status(201).send({
    messsage: 'Usando o POST dentro da rota de produtos',
  });
};

const getProductsId = (req, res) => {
  const id = req.params.productsId;
  res.status(200).send({
    mesage: 'Usando o GET de um produto exclusivo',
    id,
  });
};

const putProducts = (req, res) => {
  const id = req.params.productsId;
  // validar body
  res.status(201).send({
    messsage: 'Usando o PATCH dentro da rota de produtos',
    id,
  });
};

const deleteProducts = (req, res) => {
  const id = req.params.productsId;
  // validar body
  res.status(201).send({
    messsage: 'Usando o DELETE dentro da rota de produtos',
    id,
  });
};

module.exports = {
  getAllProducts,
  postProducts,
  getProductsId,
  putProducts,
  deleteProducts,
};
