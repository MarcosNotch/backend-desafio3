const express = require('express');
const productManager = require('./ProductManager');

const app = express();

const pm = new productManager('productos.txt');

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {

    let { limit } = req.query;
    if(limit){
        limit = parseInt(limit);
        const products = await pm.getProducts();
        res.send(products.slice(0, limit));
    }
    else{
        const products = await pm.getProducts();
        res.send(products);
    }
});

app.get('/products/:pid', async (req, res) => {

    const { pid } = req.params;
    const product = await pm.getProductById(pid);
    res.send(product);
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');

});