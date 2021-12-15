const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide your name'],
        trim: true,
        maxLength: [100, 'Name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Must provide a price'],
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: undefined
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    },
    company: {
        type: String,
        required: [true, 'Must provide a company name'],
        enum: { values: ['nike', 'terraria', 'yeezy', 'adidas', 'puma'], message: '{VALUE} is not supported' }
    }
});

// This is basic validation not advanced
module.exports = mongoose.model('Product', ProductSchema);