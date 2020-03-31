var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = require('url');
const { exec } = require("child_process");
var str = "changed KDASH";
var strA = "changed NIDS";
var strM = "changed VEYES";

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

// router.get('/index', function(req, res, next) {
// //  theScript.find()
// //      .then(function(doc) {
//   //      console.log("Array length is: " + doc.length);
//   //res.render('../Files/index.html');
//   res.sendFile('/home/ubuntu/draft1/Files/index.html');
//   //    });
// });
router.get('/getHumidity', function(req, res, next) {
  var q = url.parse(req.url, true);
//  console.log("name " + q.query.myName);
//  console.log("number " + q.query.myNum);
  res.send("" + humidity++);
});

/*router.post('/login', function(req, res, next) {
  var myFormObject = {
    username: "",
    password: ""
  };
  myFormObject.username = req.body.username;
  myFormObject.password = req.body.passwd;

  res.render('loginResponse', {title: "Login status", yourUsername: myFormObject.username, yourPassword: myFormObject.password});
}); */

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

router.post('/login', function(req, res, next) {
  //console.log(req.body.uname);
  var uname = req.body.uname;
  var pass = req.body.psw;
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  var user = "false";

  MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    var dbo = db.db("account");
    dbo.collection("user").findOne({}, function(err,result) {
    if(err) throw err;
    if(uname == result.name.first && pass == result.password) {
      console.log('Login success');
      user = "true";
    }
    //console.log(result.password);
    db.close();
   });
 });
 if(user == "true")
  return res.send("true");
 else
 res.redirect('back');
 res.end();
}); 

router.get('/veyes', function(req, res, next) {
var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    var dbo = db.db("comments");
    dbo.collection("macComments").find({}).toArray( function(err,result) {
    if(err) throw err;
    strM = "";
    for(var ii = 0; ii < result.length; ii++) {
    setCommentM(result[ii].comment + "<p></p>");
  }
    db.close();
   });
 });
return res.send(getCommentM());
});

router.get('/nids', function(req, res, next) {
var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    var dbo = db.db("comments");
    dbo.collection("anuComments").find({}).toArray( function(err,result) {
    if(err) throw err;
    strA = "";
    for(var ii = 0; ii < result.length; ii++) {
    //console.log(result[ii].comment);
    setCommentA(result[ii].comment + "<p></p>");
  }
    db.close();
   });
 });
return res.send(getCommentA());
});

router.get('/kdash', function(req, res, next) {
var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    var dbo = db.db("comments");
    dbo.collection("armenComments").find({}).toArray( function(err,result) {
    if(err) throw err;
    str = "";
    for(var ii = 0; ii < result.length; ii++) {
    console.log(result[ii].comment);
    setComment(result[ii].comment + "<p></p>");
  }
    db.close();
   });
 });
return res.send(getComment());
});

function setComment(resString) {
 str += resString;
}

function getComment() {
 return str;
}

function setCommentA(resString) {
 strA += resString;
}

function getCommentA() {
 return strA;
}

function setCommentM(resString) {
 strM += resString;
}

function getCommentM() {
 return strM;
}

router.post('/armen-review', function(req, res, next) {
var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
 //console.log(req.body);
  MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    var dbo = db.db("comments");
    dbo.collection("armenComments").insertOne({comment:req.body.name}, function(err,result) {
    if(err) throw err;
     console.log("Inserted to DB");
    db.close();
   });
 });
res.redirect('back');
res.end();
});

router.post('/anu-review', function(req, res, next) {
var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
 //console.log(req.body);
  MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    var dbo = db.db("comments");
    dbo.collection("anuComments").insertOne({comment:req.body.name}, function(err,result) {
    if(err) throw err;
     console.log("Inserted to DB");
    db.close();
   });
 });
res.redirect('back');
res.end();
});

router.post('/mac-review', function(req, res, next) {
var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
 //console.log(req.body);
  MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    var dbo = db.db("comments");
    dbo.collection("macComments").insertOne({comment:req.body.name}, function(err,result) {
    if(err) throw err;
     console.log("Inserted to DB");
    db.close();
   });
 });
res.redirect('back');
res.end();
});

module.exports = router;
