// aqui vai o código que acessa o banco de dados
const db = require('../db/models');

const getOrders = (req, res) => {
  db.order
    .findAll({
      include: [
        {
          model: db.products,
          as: 'Products',
          attributes: [
            'id',
            'name',
            'flavor',
            'complement',
            [db.sequelize.literal('"Products->orderProducts"."qtd"'), 'qtd'],
          ],
          through: {
            model: db.orderProducts,
            as: 'orderProducts',
            attributes: [],
          },
        },
      ],
    })
    .then((allOrders) => {
      res.send(allOrders);
    })
    .catch((error) => {
      res.status(502);
      res.send(error);
    });
};

const postOrders = (req, res) => {
  const orderToCreate = req.body;
  db.order.create(orderToCreate)
    .then(async (createdOrder) => {
      if (createdOrder) {
      // Se tiver uma lista de produtos, cadastra todos de forma sincronizada
        if (orderToCreate.products) {
          await Promise.all(orderToCreate.products.map(async (product) => {
            await db.orderProducts.create({
              orderId: createdOrder.id,
              productId: product.id,
              qtd: product.qtd,
            });
          }));
        }

        // depois recarrega o pedido para trazer os dados do produto
        await createdOrder.reload({
          include: [
            {
              model: db.products,
              as: 'Products',
              attributes: [
                'id',
                'name',
                'flavor',
                'complement',
                [db.sequelize.literal('"Products->orderProducts"."qtd"'), 'qtd'],
              ],
              through: {
                model: db.orderProducts,
                as: 'orderProducts',
                attributes: [],
              },
            },
          ],
        });

        const jsonResponse = createdOrder.toJSON();
        res.status(201);
        res.send(jsonResponse);
      } else {
        res.status(400);
        res.send(createdOrder);
      }
    })
    .catch((erro) => {
      res.status(502);
      res.send(erro);
    });
};

const getOrderUid = (req, res) => {
  db.order
    .findOne({
      where: {
        id: req.params.uid,
      },
      include: [
        {
          model: db.products,
          as: 'Products',
          attributes: [
            'id',
            'name',
            'flavor',
            'complement',
            [db.sequelize.literal('"Products->orderProducts"."qtd"'), 'qtd'],
          ],
          through: {
            model: db.orderProducts,
            as: 'orderProducts',
            attributes: [],
          },
        },
      ],
    })
    .then((oneOrder) => {
      res.status(oneOrder ? 200 : 404);
      res.send(oneOrder);
    })
    .catch((error) => {
      console.log(error);
      res.status(502);
      res.send(error);
    });
};

const putOrderUid = (req, res) => {
  // Primeiro eu localizo o pedido alvo.
  db.order
    .findOne({
      where: {
        id: req.params.uid,
      },
    })
    .then((orderToUpdate) => {
      if (orderToUpdate) {
        // Se achar o pedido, eu troco somente o status dele.
        // De novo, assim como no create pode validar os dados aqui.
        orderToUpdate.status = req.body;

        orderToUpdate
          .save()
          .then((result) => {
            console.log(result);
            res.send(orderToUpdate);
          })
          .catch((erro) => {
            res.status(400);
            res.send(erro);
          });
      } else {
        // Aqui só acontece quando não acho o ID do usuario no banco
        res.status(404);
        res.send();
      }
    })
    .catch((erro) => {
      res.status(502);
      res.send(erro);
    });
};

const deleteOrderUid = (req, res) => {
  db.order
    .destroy({
      where: {
        id: req.params.uid,
      },
    })
    .then(() => {
      res.status(204);
      res.send();
    })
    .catch((error) => {
      res.status(502);
      res.send(error);
    });
};

module.exports = {
  getOrders,
  postOrders,
  getOrderUid,
  putOrderUid,
  deleteOrderUid,
};
