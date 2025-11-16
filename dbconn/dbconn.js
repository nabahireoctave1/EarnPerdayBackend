const mysql=require('mysql2')
const dotenv =require('dotenv')

dotenv.config()
const fs=require('fs')

const conn=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
    acquireTimeout:10000,
    ssl:{
        rejectUnauthorized:true,
       ca:fs.readFileSync('./sslsec/ca.pem')
    },

    typeCast:function(field,next){
        if(field.type==='DATE'){
            return field.string()
        }
        return next()
    }
})






module.exports=conn



