const productRouter = require('express').Router();
const controller = require('../controllers/product.js');
// const authMiddleware = require('../middlewares/auth.js');
// const roleMiddleware = require('../middlewares/checkRole.js');

// productRouter.use('/', authMiddleware);
// productRouter.use('/order', authMiddleware);
// productRouter.use('/delivered', authMiddleware);

productRouter.post('/', controller.createProduct);
productRouter.post('/:productId', controller.updateProduct);
productRouter.get('/:productId/:role/:id', controller.getProductbyId);
productRouter.get('/:role/:id', controller.getAllProducts);
productRouter.get('/log/:productId/:role/:id', controller.getLog);

module.exports = productRouter;
