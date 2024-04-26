const mysql = require('mysql')

var conn = mysql.createConnection({
    'hostname':'localhost',
    'user':'root',
    'password':'',
    'database':'employee'
    })


module.exports = conn;

// {
//     "emp_id":1,
//     "emp_name":"isha",
//     "mobile":8108217848,
//     "email":"isham@gmail.com",
//     "salary":2000,
//     "city":"Mumbai",
//     "age":20,
//     "department":"HR",
//     "role":"executive"
//   }