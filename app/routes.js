import koaRouter from "koa-router";
import * as apiController from './controllers/apiController'

const router = koaRouter();
export default router
router.post('/import', apiController.createDummyData);

router.get('/products', apiController.getAllProducts);
router.get('/products/:id', apiController.getProductById);
router.get('/stores', apiController.getAllStores);
router.get('/store/:id/products', apiController.getStoreProducts);

router.get('/summary', apiController.summary);




