const mongoose = require("mongoose");
const dbURL = 'mongodb://localhost:27017/online-shop';

var dataTables = require('mongoose-datatables');

const productShema = mongoose.Schema({
        "_id": String,
        "name": String,
        "image": Array,
        "size": Array,
        "color": Array,
        "price": Number,
        "consumer_price": Number,
        "description_ar": String,
        "description_en": String,
        "category": Array,
        "sub_category": Array
    }
)

productShema.plugin(dataTables)

const product = mongoose.model('product', productShema)




exports.AddNewProduct = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            let p = new product(data);
            return p.save()

        }).then(products => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}
exports.getProductsDataTable = (length, start, SearchValue) => {
    console.log(length);
    var i=start;
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return product.dataTables(
                {
                    limit: length,
                    skip: start,
                    search: {
                        value: SearchValue,
                        fields: ["name","size","color","price","consumer_price",
                            "description_ar","description_en","category","sub_category"]
                    },
                    sort: {
                        name: 1
                    },formatter: function(products) {
                        i++;

                        return {
                            index:i ,
                            name: products.name ,
                            size: products.size ,
                            image: '  <img src="'+products.image[0] +'" class="img-thumbnail" alt="Cinque Terre" width="50" > ' ,
                            consumer_price: products.consumer_price ,
                            price: products.price ,
                            description_ar: products.description_ar ,
                            description_en: products.description_en ,
                            category: products.category ,
                            sub_category: products.sub_category ,
                            update:'<a href="#" data_id="'+products._id+'" class="green-btn btn_editNewcategory"><i class="fa fa-edit"></i></a>',
                            delete:'<a href="#" data_id="'+products._id+'" class="green-btn BtnDelete"><i class="fa fa-trash"></i></a>'

                        }
                    }
                })
        }).then(products => {
            mongoose.disconnect();
            // i=0;
            console.log(products)
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    }).catch(function (err) {
        return '';
    })
}


exports.getFirstProduct = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return product.findOne({})

        }).then(products => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    }).catch(function (err) {
        return '';
    })
}
exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            // return product.find({'_id':id})
            return product.findById(id);
        }).then(products => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    }).catch(function (err) {
        return '';
    })
}
exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return product.find({})
        }).then(products => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    }).catch(function (err) {
        return '';
    })
}

exports.getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return product.find({category: category})
        }).then(products => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    }).catch(function (err) {
        return '';
    })
}
exports.deleteOneProduct = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return product.deleteOne({_id:id})
        }).then(products => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    }).catch(function (err) {
        return '';
    })
}