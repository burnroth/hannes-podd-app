var builder = require("xmlbuilder");
var express = require("express");
var fs = require("fs");

var router = express.Router();
var dirPath = "./hannes.xml";


// FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");




admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://maggan-b2fb6.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("kajak");


ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});



var doc = builder
	.create("root")
	.ele("xmlbuilder")
	.att("for", "node-js")
	.ele("repo")
	.att("type", "git")
	.att("maggan", "git")
	.txt("git://github.com/oozcitak/xmlbuilder-js.git")
	.up()
	.up()
	.ele("test")
	.txt("complete")
	.end({ pretty: true });

var xmldoc = doc.toString({ pretty: true });

fs.writeFile(dirPath, xmldoc, function(err) {
	if (err) {
		return console.log(err);
	}
	console.log("The file was saved!");
	// res.render("index", { title: "Generate XML using NodeJS" });
});
