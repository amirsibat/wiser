import { IRouterContext } from 'koa-router'
import { Store } from '../models/store'
import { Product } from '../models/product'
import { STORES, PRODUCTS } from '../../utils/constants'
import {ResourceNotFoundError, StoreMismatchError, BadRequestError} from '../../utils/errors'

/**
 * Create Dummy Data
 * @param ctx
 * @returns {*}
 * @throws Exception failed to create dummy data
 */
export async function createDummyData(ctx) {
    await Store.createStoreDummy(STORES);
    await Product.createProductsDummy(PRODUCTS);
    ctx.status = 204;
}

function parseQueryString(query_string) {
    let toSort = null;
    let toLimit = null;
    let err = false;
    if(query_string.sort) {
        switch (query_string.sort){
            case 'asc':
                toSort = 1;
                break;
            case 'desc':
                toSort = -1;
                break;
            default:
                err = true;
        }
    }
    if(query_string.limit) {
        if(parseInt(query_string.limit)) {
            toLimit = parseInt(query_string.limit)
        } else {
            err = true;
        }
    }
    if (err) {
        throw new BadRequestError();
    } else {
        return {
            toSort: toSort,
            toLimit: toLimit
        }
    }

}

export async function getAllProducts(ctx) {
    let query_string;
    if (ctx.query){
        query_string = parseQueryString(ctx.query);
    }
    ctx.body = await Product.getAllProducts(query_string.toSort, query_string.toLimit);
}

export async function getAllStores(ctx){
    ctx.body = await Store.find({});
}

export async function getProductById(ctx) {
    let product = await Product.findById(ctx.params.id);
    if (!product) {
        throw new ResourceNotFoundError()
    }
    ctx.body = product
}

export async function getStoreProducts(ctx) {
    let query_string;
    let store = await Store.findById(ctx.params.id);
    if(!store) {
        throw new BadRequestError();
    }
    if (ctx.query){
        query_string = parseQueryString(ctx.query);
    }
    ctx.body = await Product.findStoreProducts(String(store._id),query_string.toSort, query_string.toLimit)
}

export async function summary(ctx) {
    let container = {};
    let stores = await Store.getAllStores();
    for (let store of stores) {
        let productsCount = await Store.getProductsCount(store._id);
        let priceRange = await Store.getPriceRange(store._id);
        container[store._id] = {
            store_name: store.name,
            products_count: productsCount,
            price_range: priceRange[1] !== undefined ? priceRange[1] + " - " + priceRange[0] : 'N/A',
            average_price: priceRange[1] != undefined ? parseInt(priceRange[0])/parseInt(priceRange[1]) : 'N/A'
        };
    }
    ctx.body = container;
}