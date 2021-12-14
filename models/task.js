const mongoose = require('mongoose');

// So what is a schema
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide your name'],
        trim: true,
        maxLength: [20, 'Name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false,
    }
})
// This is basic validation not advanced
module.exports = mongoose.model('Task', TaskSchema)