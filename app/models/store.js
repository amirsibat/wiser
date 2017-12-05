import mongoose from 'mongoose'
import {Product} from './product'

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    url: {
        type: String,
        lowercase: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {collection: 'stores'});

// Instance methods
storeSchema.methods = {

};

// Static methods
storeSchema.statics = {
    createStoreDummy: async function (stores) {
       return await this.create(stores)
    },
    getAllStores: async function () {
        return await this.find({});
    },
    getProductsCount: async function (id) {
        return await Product.find({store_id: id}).count();
    },
    getPriceRange: async function (id){
        let res = [];
        let maxPrice = await Product.find({store_id: id}).sort("-price").limit(1).select("-_id price");
        let minPrice = await Product.find({store_id: id}).sort("price").limit(1).select("-_id price");
        if(maxPrice.length > 0){
            res.push(maxPrice[0]["price"]);
        }
        if(minPrice.length > 0) {
            res.push(minPrice[0]["price"]);

        }
        return res;
    },
    getAveragePrice: async function (id) {
        return null;
    }
};

export const Store = mongoose.model('Store', storeSchema);