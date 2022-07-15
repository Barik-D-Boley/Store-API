const express = require('express');
const app = express();
const products = require('./routes/products');
const connectDB = require('./db/connect');
const { connect } = require('./routes/products');
// const populateProducts = require('./populate');
require('dotenv').config();

const port = process.env.PORT || 5000;

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// Middleware
app.use(express.json());
app.use('/api/v1/products', products);
app.use(express.static('public'));

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}\nhttp://localhost:${port}/`));
    } catch (error) { console.log(error) }
}
start();