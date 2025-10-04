const {Client, Client} = require('pg')

const Client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Srushti26@",
    databace: "postgres"
})
Client.connect();

Client.query( 'Select * from doctors',(res,err)=>{
    if(!err){
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    Client.end();
})
   