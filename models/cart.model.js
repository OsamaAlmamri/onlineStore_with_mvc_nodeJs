const mongoose = require("mongoose");
const dbURL = 'mongodb://localhost:27017/online-shop';

const cartShema = mongoose.Schema({
    "name": String,
    "price": Number,
    "amount": Number,
    "color": String,
    "size": String,
    "image": String,
    "product_id": String,
    "user_id": String,
    "timestamp": Number,
})


const CartItem = mongoose.model('cart', cartShema)


exports.AddNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            let item = new CartItem(data);
            return item.save()

        }).then(products => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.getItemsByUser = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            // return product.find({'_id':id})
            return CartItem.find({user_id:id});
        }).then(items => {
            mongoose.disconnect();
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    }).catch(function (err) {
        return '';
    })
}