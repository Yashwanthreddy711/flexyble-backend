const mysql=require('mysql2')
const env=require('dotenv').config();

// const dbconfig=mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: process.env.password,
//         database: 'flexyble',
//     }
// )
const dbconfig=mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.password,
        database: 'flexyble',
        waitForConnections: true,
        // connectionLimit: 10,
        // queueLimit: 0
    }
)
// dbconfig.connect((error)=>{
//     if(error)throw error
//     //console.log("database connected successfully")
// })
module.exports=dbconfig;