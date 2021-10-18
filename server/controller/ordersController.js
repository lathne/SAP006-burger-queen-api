/*
  O controlador é a parte que cuida do processamento da solicitação do cliente,
  que lida com a solicitação HTTP e retorna uma resposta.
  A resposta pode ser um JSON se você estiver chamando um endpoint de API
*/

const getAllOrders = async (req, res) => {
  res.status(200).send({
    messsage: 'Usando o GET dentro da rota de pedidos',
  });
};

const getOrdersId = (req, res) => {
  const id = req.params.orderId;
  res.status(200).send({
    mesage: 'Usando o GET de um pedidos exclusivo',
    id,
  });
};

const postOrders = (req, res) => {
  // validar body

  res.status(201).send({
    messsage: 'Usando o POST dentro da rota de pedidos',
  });
};

const putOrders = (req, res) => {
  const id = req.params.orderId;
  // validar body
  res.status(201).send({
    messsage: 'Usando o PUT dentro da rota de pedidos',
    id,
  });
};

const deleteOrders = (req, res) => {
  const id = req.params.orderId;
  // validar body
  res.status(201).send({
    messsage: 'Usando o DELETE dentro da rota de pedidos',
    id,
  });
};

module.exports = {
  getAllOrders,
  postOrders,
  getOrdersId,
  putOrders,
  deleteOrders,
};
