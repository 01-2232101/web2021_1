const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select car.id, car.name, maker.name as name2
from car inner join maker
on car.maker_id=maker.id;
`

db.serialize( () => {
    db.all( sql, (error, row) => {
        if(error) {
            console.log('Error: ', error );
            return;
        }
        for( let data of row ) {
            console.log( data.id + ' : ' + data.name + ':' + data.name2 );
        }
    });
});
pp.use(function(req, res, next) {
    res.status(404).send('ページが見つかりません');
  });
  
  app.listen(8080, () => console.log("Example app listening on port 8080!"));
  