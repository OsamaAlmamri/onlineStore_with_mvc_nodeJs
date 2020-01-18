const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const homeRoute = require('./routes/home.route');
const productRoute = require('./routes/product.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
const adminProductRoute = require('./routes/admin/product.route');
const session = require('express-session');

const SessionStore = require('connect-mongodb-session')(session);
const flashSession=require('connect-flash');
const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/online-shop',
    collection: 'session',
})
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
// }))

app.use(session({
    secret: 'this is key secret to ecncrypt my session in mongo db -osama mohammmed-',
    saveUninitialized: false,
    resave: false,
    cookie:{
        /* expires*/  maxAge:1*60*60*100 //milliSecond
         },
    store: STORE
}))
app.use(flashSession())
app.use(bodyParser.urlencoded({limit: "5000mb", extended: true}));
app.set("view engine", "ejs");
app.set("views", "views");
// app.use("/assets", express.static("assets"));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/product', productRoute);
app.use('/admin/product', adminProductRoute);
app.use('/cart', cartRoute);
app.use('/', homeRoute);
app.use('/', authRoute);


app.use((req, res, next) => {
    res.send('error 404 ');
});

app.listen(7000, function () {
    console.log("start11" + 7000);
});