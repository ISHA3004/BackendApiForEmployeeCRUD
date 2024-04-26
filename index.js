const conn = require('./connection')
const validateValues = require('./validation.js');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.json());
app.use(cors());

//connectToDatabase();
conn.connect((err)=>{
    if(err)
        console.log("Error connecting")
    else
        console.log("Connected");
})

app.post('/insertrec',async (req,res) => {

    var {emp_id,emp_name,mobile,email,salary,city,age,department,role} = req.body;

    let valStatus = validateValues(emp_id,emp_name,mobile,email);
    if(valStatus === "ok")
    {
        var sql = "INSERT INTO employeedetails(emp_id,emp_name,mobile,email,salary,city,age,department,role) VALUES(?,?,?,?,?,?,?,?,?)";

        conn.query(sql,[emp_id,emp_name,mobile,email,salary,city,age,department,role],(err) => {
            if(err)
                //console.log("Insertion failed "+err);
                res.status(403).send("Insertion failed "+err);
            else
                res.status(200).send("Successfully inserted");
        })
    }
    else
    {
        res.status(400).send(valStatus);
    }
})

app.get('/getrec',(req,res)=>{
    var {getattr,getval} = req.body;
    getattr = getattr.toLowerCase();
    var sqlsel = `SELECT * FROM employeedetails where ${getattr} = ?`;
    conn.query(sqlsel,[getval],(err,result)=>{
        if(err)
            res.status(400).send("Data fetch failed "+err);
        else
            res.status(200).send(result);
    })
})

app.put('/updrec',(req,res)=>{
    var {empattr,updval,selattr,selval} = req.body;
    empatrr = empattr.toLowerCase();
    selattr = selattr.toLowerCase();
    var sqlupd = `UPDATE employeedetails SET ${empattr}=? where ${selattr}=?`;
    conn.query(sqlupd,[updval,selval],(err)=>{
        if(err)
            res.status(400).send("Update failed "+err);
        else    
            res.status(200).send("updated successfully");
    })
})

app.delete('/delrec',(req,res)=>{
    var {delattr,delval} = req.body;
    delattr = delattr.toLowerCase();
    var sqlupd = `DELETE FROM employeedetails where ${delattr}=?`;
    conn.query(sqlupd,[delval],(err)=>{
        if(err)
            res.status(400).send("Deletion failed "+err);
        else    
            res.status(200).send("Deleted successfully");
    })
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });