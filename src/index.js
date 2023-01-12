const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();
const {db} = require('./model/dbconnect');

//Start server => npm start

app.use (cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//read
app.get('/api/read-data', (req, res) => {
    const sqlQuery = "SELECT * FROM user";

    db.query(sqlQuery, (err, result)=> {
        if(err){
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        }
    });
});


app.get('/api/read-user/:email', (req, res) => {
    const userEmail = req.params.email;
    const sqlQuery = "SELECT * FROM user WHERE email = ?";

    db.query(sqlQuery,userEmail, (err, result)=> {
        if(err){
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        }
    });
});

app.post('/api/login', (req, res) => {
    // const userName = req.body.username;
    // const userPass = req.body.password;
    // res.send("helo");
    const data = req.body;
    const sqlQuery = `SELECT * FROM user WHERE username = '${data.username}' and password = '${data.password}' limit 1`;

    db.query(sqlQuery, (err, result)=> {
        if(result == ''){
            res.status(404).send({
                Status: "404"
            });
            // res.json({Status: 'User not found'});
            // throw err;
        }else{
            res.send(result[0]);
            // res.json({Status: 'User founded'});
            // res.send(result);
            // console.log(result);
        }
    });
});

//create
app.post('/api/create/user', (req, res) => {
    const userEmail = req.body.email;
    const userName = req.body.username;
    const userPassword = req.body.password;
    const userToken = makeid(10);

    const sqlQuery = "INSERT INTO user (email, username, password, token) VALUE (?, ?, ?, ?)";
    db.query(sqlQuery, [userEmail, userName, userPassword, userToken], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.json({Status: 'User Add Success!'});
            // res.send(result);
            console.log(result);
        }
    });
});

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//update data user
app.put('/api/update/user', (req, res) => {
    const userPassword = req.body.password;
    const userEmail = req.body.email;
    // const userToken = req.body.token;

    const sqlQuery = "UPDATE user SET password = ? WHERE email = ?";
    db.query(sqlQuery, [userPassword, userEmail], (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        }
    });
});

//delete
app.delete('/api/delete/user', (req, res) =>{
    const userEmail = req.body.email;

    const sqlQuery = "DELETE FROM user WHERE email = ?";
    db.query(sqlQuery, [userEmail], (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        }
    });
});

app.listen(process.env.PORT, ()=> {
    console.log('Server port 8080 works!');
});
