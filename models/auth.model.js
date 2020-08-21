const mongoose = require("mongoose");
const dbURL = 'mongodb://localhost:27017/online-shop';
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const encryptedString = cryptr.encrypt('bacon');
// const decryptedString = cryptr.decrypt(encryptedString);


// const PostSchema = new Schema({
//     _id: { type: Schema.Types.ObjectId },
//     title: { type: String },
//     details: { type: String },
//     views: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     dislikes: { type: Number, default: 0 },
//     createdAt: { type: Date },
// });


const authShema = mongoose.Schema({
        "username": String,
        "image": {type: String, default: '/assets/website/default_login.png'},
        "password": String,
        "phone": String,
        "email": String,
        "isAdmin": {type: Boolean, default: false}
    }
)
const User = mongoose.model('user', authShema)
//
//


exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return User.findOne({email: email})
        }).then(user => {
            if (!user) {
                mongoose.disconnect()
                reject(' email not found ')
            } else {
                // return bcrypt.compare(password,user.password);
                if (password == cryptr.decrypt(user.password)) {
                    mongoose.disconnect()
                    resolve(
                        {
                            'isUser': user._id,


                        });
                } else {
                    mongoose.disconnect()
                    reject(' password is wrong ');
                }
            }
        }).catch(err => {
            mongoose.disconnect()
            reject(err);
        })
    })
}
exports.createNewUser = (username, email, password, phone) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return User.findOne({email: email})
        }).then(user => {
            if (user) {
                mongoose.disconnect()
                reject('user is used');
            } else {
                // return bcrypt.hash(password, 10);
                return cryptr.encrypt(password);
            }
        }).then(hashedPassword => {
            let user = new User({
                "username": username,
                "password": hashedPassword,
                "phone": phone,
                "email": email
            });
            return user.save();

        }).then(() => {
            mongoose.disconnect();
            resolve('user created')
        }).catch(err => {
                mongoose.disconnect()
                reject(err)
            }
        )
    })

}

// exports.getProductById = (id) => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(dbURL).then(() => {
//             // return product.find({'_id':id})
//             return product.findById(id);
//         }).then(products => {
//             mongoose.disconnect();
//             resolve(products)
//         }).catch(err => reject(err))
//     }).catch(function (err) {
//         return '';
//     })
// }
// exports.getAllProducts = () => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(dbURL).then(() => {
//             return product.find({})
//         }).then(products => {
//             mongoose.disconnect();
//             resolve(products)
//         }).catch(err => reject(err))
//     }).catch(function (err) {
//         return '';
//     })
// }
//
// exports.getProductsByCategory = (category) => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(dbURL).then(() => {
//             return product.find({category:category})
//         }).then(products => {
//             mongoose.disconnect();
//             resolve(products)
//         }).catch(err => reject(err))
//     }).catch(function (err) {
//         return '';
//     })
// }