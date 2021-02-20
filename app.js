require('dotenv').config({});

//require : memerlukan

const express = require('express');
const app = express();

const mysql = require('mysql');

const hbs = require('hbs');
const path = require('path');

const bodyParser = require('body-parser');


const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE, PORT } = process.env

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password : DB_PASSWORD,
    database : DB_DATABASE
});

connection.connect((err) => {
    if(err) throw err;
    console.log("koneksi sukses");
});

//dekralasi agar views dipake 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}))

//route GET kategori
app.get('/view/kategori', (req, res) => {
    const sql = 'SELECT * FROM kategori';

    connection.query(sql, (err, data) => {
        if(err){
            console.log(err)
        }else {
            console.log("data sebenarnya " + JSON.stringify(data));
            res.render('kategori/index', {
                title: 'Kategori',
                kategori : data
            });
        }
    })
   
});


// Route Save kategori
app.post('/view/kategori/save', (req, res) => {
    console.log(req);
    const { body } = req;
    // const body = req.body
    const sql = "INSERT INTO kategori SET ?";
    connection.query(sql, body, (err, data) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/view/kategori');
        }
    });
})



// Route Update Categories
app.post('/view/kategori/update', (req, res) => {
    // const id = req.body.id
    const { id, kategori_nama } = req.body;
    const sql = "UPDATE kategori SET kategori_nama=? WHERE id= ?";
    connection.query(sql, [kategori_nama, id], (err, data) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/view/kategori');
        }
    });
})



// Route Delete Categories
app.post('/view/kategori/delete', (req, res) => {
    const { id } = req.body;
    const sql = "DELETE FROM kategori WHERE id=?";
    connection.query(sql, id, (err, data) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/view/kategori');
        }
    })
})





//Route Get buku
app.get('/view/buku', (req, res) => {
    const sql = 'SELECT * FROM buku';

    connection.query(sql, (err, data) => {
        if(err){
            console.log(err)
        }else {
            console.log("data sebenarnya " + JSON.stringify(data));
            res.render('buku/index', {
                title: 'Buku',
                kategori : data
            });
        }
    })
});



// Route Save buku
app.post('/view/buku/save', (req, res) => {
    console.log(req);
    const { body } = req;
    // const body = req.body
    const sql = "INSERT INTO buku SET ?";
    connection.query(sql, body, (err, data) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/view/buku');
        }
    });
})


// Route Update buku
app.post('/view/kategori/buku', (req, res) => {
    // const id = req.body.id
    const { id_buku, judul, pengarang, penerbit, tahun_terbit } = req.body;
    const sql = "UPDATE buku SET judul=? , pengarang=? , penerbit=? , tahun_terbit=? WHERE id_buku= ?";
    connection.query(sql, [judul, pengarang, penerbit, tahun_terbit, id_buku], (err, data) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/view/kategori');
        }
    });
})



// Route Delete Categories
app.post('/view/kategori/delete', (req, res) => {
    const { id_buku } = req.body;
    const sql = "DELETE FROM buku WHERE id_buku=?";
    connection.query(sql, id_buku, (err, data) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/view/kategori');
        }
    })
})





// cek bis ga
// app.get('/', (req, res) => {
    // const sql = 'SELECT * FROM kategori';
// 
    // connection.query(sql, (err, data) => {
        // if(err){
            // console.log(err)
        // }else{
            // res.send({
                // msg: 'Sukses',
                // status: 200,
                // data : data
            // });
        // }
    // }); 
// });


//console.log(process.env);

const port = 2000;

app.listen(port, () => {
    console.log("server jalan di port " + port);
});