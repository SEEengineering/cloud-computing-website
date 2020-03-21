var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = require('url');
const { exec } = require("child_process");

mongoose.connect('localhost:27017/scriptDb');
var Schema = mongoose.Schema;

var scriptSchema = new Schema({
  Name: String,
  Script: String
  
});

var theScript = mongoose.model('script', scriptSchema);
var humidity = 0;

router.get('/', function(req, res, next) {
//  theScript.find()
//      .then(function(doc) {
  //      console.log("Array length is: " + doc.length);
        res.render('index', {title: "My First Page"});
  //    });
});

router.get('/getHumidity', function(req, res, next) {
  var q = url.parse(req.url, true);
//  console.log("name " + q.query.myName);
//  console.log("number " + q.query.myNum);
  res.send("" + humidity++);
});

router.post('/login', function(req, res, next) {
  var myFormObject = {
    username: "",
    password: ""
  };
  myFormObject.username = req.body.username;
  myFormObject.password = req.body.passwd;

  res.render('loginResponse', {title: "Login status", yourUsername: myFormObject.username, yourPassword: myFormObject.password});
});

router.post('/jsonExample', function(req, res, next) {
  var rxObject = req.body;
  console.log("" + rxObject.myName);
  console.log("" + rxObject.myNum);
  var txObject = {
    number: 101010,
    color: ""
  };
  res.json(txObject);
});

router.post('/licencePlate', function(req, res, next) {
  var jsObject = req.body;
  console.log("" + jsObject.plateNumber);
});

router.post('/getLicencePlate', function(req, res, next) {
  var jsObject = {
    number: "",
    color: ""
  }
  jsObject.number = "17D12345";
//  console.log(jsObject.number);
  res.json(jsObject);
});

router.post('/runScript', function(req, res, next) {
  var scrObject = req.body;
  var stdOutString = "";
  console.log(scrObject.scriptInput);

  exec(scrObject.scriptInput, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    stdOutString = `${stdout}`;
    console.log(stdOutString);
    scrObject.scriptOutput = stdOutString;
    res.json(scrObject);
  });
});


module.exports = router;
