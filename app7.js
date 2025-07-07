const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');


app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('home', {mes:message});
});


app.get("/book", (req, res) => {
    db.serialize( () => {
        db.all("select id, book.name from book;", (error, row) => {
            if( error ) {
                res.render('home', {mes:"エラーです"});
            }
            res.render('book', {data:row});
        })
    })
})
   
app.get("/book_db/:id",(req,res) =>{
    db.serialize( () => {
        let sql = `
        SELECT book.id, book.name, writer.name AS name2
        FROM book INNER JOIN writer
        ON book.writer_id = writer.id
        WHERE book.id = ${req.params.id};
        `

        db.all( sql, (error, row) => {
            if( error ) {
                res.render('home', {mes:"エラーです"});
            } 	
            res.render('book_db', {data:row});
        })
    })
})

app.post("/new_book", (req, res) => {
    let sql = `
    insert into book (name,writer_id) values ("` + req.body.name + `",` + req.body.writer_id + `);
    `
    console.log(sql);
    db.serialize( () => {
        db.run( sql, (error, row) => {
            console.log(error);
            if(error) {
                res.render('show', {mes:"エラーです"});
            }
            res.redirect('/book_db');
        });
    });
    console.log(req.body);
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));