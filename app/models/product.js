import mongoose from 'mongoose'
import {ShippingTypeVlues} from '../../utils/enums'
const ObjectId = mongoose.Schema.Types.ObjectId;

let validatePrice = function (price) {
    return price > 0;
};


const productSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        validate: [validatePrice, 'price cant be zero']
    },
    shipping: {
        type: String,
        required: true
    },
    sku: { // stock keeping unit number
        type: Number,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    brand: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    store_id: {
        type: ObjectId,
        ref: 'Store',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {collection: 'products'});

productSchema.index({price: 1});
productSchema.index({createdAt: 1});

// Instance methods
productSchema.methods = {};

// Static methods
productSchema.statics = {
    createProductsDummy: async function (products) {
        return await this.create(products);
    },
    findStoreProducts: async function(id, toSort=null, toLimit=null) {
        if(toSort && !toLimit) {
            return await this.find({store_id: id}).sort({price: toSort});
        } else if (!toSort && toLimit) {
            return await this.find({store_id: id}).limit(toLimit);
        } else if (toSort && toLimit) {
            return await this.find({store_id: id}).sort({price: toSort}).limit(toLimit);
        } else {
            return await this.find({store_id: id})
        }
    },
    getAllProducts: async function(toSort=null, toLimit=null) {
        if(toSort && !toLimit) {
            return await this.find({}).sort({price: toSort});
        } else if (!toSort && toLimit) {
            return await this.find({}).limit(toLimit);
        } else if (toSort && toLimit) {
            return await this.find({}).sort({price: toSort}).limit(toLimit);
        } else {
            return await this.find({})
        }
    }
};

export const Product = mongoose.model('Product', productSchema);