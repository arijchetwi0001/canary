const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

const path = require('path');

var mysql = require('mysql');

var pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "canary"
});

pool.connect(function (err) {
  if (err) throw err;

});


app.use(express.static('public'));
const hbs = handlebars.create({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', function (req, res) {
  res.render("main", {
    layout: 'index'
  });
});
app.get('/signin', (req, res) => {
  res.render("signin", {
    layout: 'index'
  });
})
app.get('/signup', (req, res) => {
  res.render("signup", {
    layout: 'index'
  });
})
app.get('/profile/:username', (req, res) => {

  console.log(req.params.username)
  pool.query("SELECT * FROM user where user_name = ?", req.params.username, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.render('profile', {
      layout: 'index',
      userinfo: result
    });
  });
})




app.listen(3000);