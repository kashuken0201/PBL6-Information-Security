const transactRouter = require('express').Router();
const controllerTransact = require('../controllers/transact.js');
// const authMiddleware = require('../middlewares/auth.js');

// transactRouter.use('/', authMiddleware);
// transactRouter.use('/consumer', authMiddleware);

transactRouter.get('/:role/:id', controllerTransact.getAllTransact),
transactRouter.post('/order/:productId', controllerTransact.transactProductOrder),
transactRouter.post('/sell/:productId', controllerTransact.transactProductSell);
transactRouter.post('/deliver/:productId', controllerTransact.transactProductDeliver);

module.exports = transactRouter;
