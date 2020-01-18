const productModel = require('../../models/products.model');
const validationResult = require('express-validator').validationResult;
var upload_files = require('multer')();


// app.post('/table', (req, res) {
//     productModel.dataTables({
//         limit: req.body.length,
//         skip: req.body.start,
//         search: {
//             value: req.body.search.value,
//             fields: ['username']
//         },
//         sort: {
//             username: 1
//         }
//     }).then(function (table) {
//         res.json(table); // table.total, table.data
//     })
// });
//

exports.getAllProduct = (req, res) => {
    // let id=req.params.id
    res.render('admin/products/show', {
        pageTittle: "product",
        isUser: req.session.userId
    })
}


exports.getAddProductImages = (req, res) => {
    var bluebird = require('bluebird');
    var fs = bluebird.promisifyAll(require('fs'));
    var path = require('path');
    var sanitize = require("sanitize-filename");

    if (req.files) {
        console.log("req.files.length = ", req.files.length);

        var upload_dir = 'uploads';  //somewhere relevant
      var   images=[];
        bluebird.resolve(req.files)
            .each(function (file_incoming, idx) {
                console.log("  Writing POSTed data :", file_incoming.originalname);
                var sanitized_filename = sanitize(file_incoming.originalname);
                var time=Date.now().toString();
                sanitized_filename=time+sanitized_filename;
                 var file_to_save = path.join(upload_dir, sanitized_filename);
                images.push('/'+upload_dir+'/'+sanitized_filename);
                return fs.writeFileAsync(file_to_save, file_incoming.buffer)

            }).catch(err => (
            console.log(err)
        )).then(_ => {
                // console.log("Added files : Success");
            console.log(images)
            // return res.sendStatus(200);
            res.json({
                data:images
            });
            });

    }

}


exports.getAddProduct = (req, res) => {
    // let id=req.params.id
    res.render('admin/products/add', {
        pageTittle: "product",
        isUser: req.session.userId
    })
}

exports.PostAddProduct = (req, res) => {



    if(validationResult(req).isEmpty())
    {
        productModel.AddNewProduct({
            "name": req.body.name,
            "image":  req.body.images,
            "size": req.body.colors.split(","),
            "color": req.body.size.split(","),
            "price": req.body.price,
            "consumer_price": req.body.consumer_price,
            "description_ar": req.body.description_ar,
            "description_en": req.body.description_en,
            "category": req.body.category,
            "sub_category": req.body.sub_category

        }).then(()=>{
            res.redirect('/admin/product/add')
        }).catch(err=>{
            console.log(err)
        })
    }
    else
    {
        req.flash('errors',validationResult(req).array())
        res.redirect('/admin/product/add')
    }


}

exports.PostAllProduct = (req, res) => {
    console.log(req)
    var length = 0;
    var start = 0;
    var value = 0;

    if (req.body.length)
        length = req.body.length;
    if (req.body.start)
        start = req.body.start;

    if (req.body.search)
        value = req.body.search.value

    productModel.getProductsDataTable(length, start, value).then(table => {


        console.log(table.data)
        res.json({
            data: table.data,
            recordsFiltered: table.total,
            recordsTotal: table.total
        });

        console.log(',,,,,,,,,,,,,,,,,,,,')


    })
}

exports.deleteProduct = (req, res) => {
    productModel.deleteOneProduct(req.body.id).then(deleted => {
        console.log(deleted)
        if (deleted) {
            res.json({
                data: 'done',
            });
        } else {
            res.json({
                data: deleted,
            });
        }

    })
}

