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
        let sql = `
        select book.id, book.name, writer.name as name2
        from book inner join writer
        on book.writer_id=writer.id;
        `
        
        db.all( sql, (error, row) => {
            if(error) {
                res.render('home', {mes:"エラーです"});
                return;
            }
            res.render('book', {data:row}); 
        });
    });
});     
   
app.get("/book/:id",(rep,res) =>{
    db.serialize( () => {
        db.all("select id, writer from book where id=" + req.params.id + ";", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            } 	
            res.render('db', {data:row});
        })
    })
})


app.listen(8080, () => console.log("Example app listening on port 8080!"));