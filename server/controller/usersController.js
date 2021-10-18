/*
  O controlador é a parte que cuida do processamento da solicitação do cliente,
  que lida com a solicitação HTTP e retorna uma resposta.
  A resposta pode ser um JSON se você estiver chamando um endpoint de API
*/

const getAllUsers = async (req, res) => {
  res.status(200).send({
    messsage: 'Usando o GET dentro da rota de usuários',
  });
};

const getUserId = (req, res) => {
  const id = req.params.uid;
  res.status(200).send({
    mesage: 'Usando o GET de um usuário exclusivo',
    id,
  });
};

const postUser = (req, res) => {
  // validar body

  res.status(201).send({
    messsage: 'Usando o POST dentro da rota de usuário',
  });
};

const putUser = (req, res) => {
  const id = req.params.uid;
  // validar body

  res.status(201).send({
    messsage: 'Usando o PUT dentro da rota de usuário',
    id,
  });
};

const deleteUser = (req, res) => {
  const id = req.params.uid;
  // validar body

  res.status(201).send({
    messsage: 'Usando o DELETE dentro da rota de usuário',
    id,
  });
};

module.exports = {
  getAllUsers, postUser, getUserId, putUser, deleteUser,
};
