var express = require("express")
var carts = express.Router()
const Cart = require("../model/Cart")
const jwt = require("jsonwebtoken")
const Sequelize = require('sequelize');
const Op =Sequelize.Op;

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    } 
}
carts.get('/getcartitemsbyuserid',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        var user_id = authData.id; 
        if(err) {
            res.sendStatus(403);
        } else {
            Cart.findAll({ where: {
            user_id: user_id, 
            order_status:0
            } })
            .then(cartproducts=>res.status(200).json(cartproducts))
            .catch(err => res.send("error:" +err));
        }
    })
});
carts.get('/get-merchandise-amount',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        var user_id = authData.id; 
        if(err) {
            res.sendStatus(403);
        } else {
            Cart.findAll({
                attributes: [[Sequelize.fn('SUM', Sequelize.col('total_amount')), 'total_amount']],
                where: {[Op.and]: [{user_id: {[Op.eq]: user_id}}, {order_status: {[Op.eq]: 0}}]},
                }) 
            .then(totalamount=>res.status(200).json(totalamount))
            .catch(err => res.send("error:" +err));
        }
    })
}); 
carts.post('/addtocart',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        var user_id = authData.id; 
        var cartData = {
                user_id:user_id,
                product_id: req.body.product_id,
                product_title: req.body. product_title,
                product_description: req.body. product_description,
                product_price: req.body. product_price,
                product_logo: req.body. product_logo,
                no_of_items: req.body.no_of_items
            }   
        if(err) {
            res.sendStatus(403);
        } else {
            Cart.create(cartData)
            .then(()=> {
                res.status(200).send("Product added to cart Successfully..!")
            })
            .catch(err => {
                res.send("Error: " +err)
            })
        }
    });
}); 
carts.put("/updatecart/:id", (req, res)=> {
    jwt.verify(req.token, 'secret', (err, authData) => {
    Cart.update(
        { no_of_items: req.body.no_of_items }, 
        { where: { id: req.params.id }}
    )
    .then(()=> {
        res.status(200).send("Cart Updated")
    })
    .error(err => res.send(err))
})

})
carts.delete("/deletecart/:id", verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secret', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else { 
            Cart.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(()=> {
                res.status(200).send("cart product Deleted")
            })
            .catch(err => {
                res.send("error: "+ err)
            })
        }
    })
});

module.exports = carts;