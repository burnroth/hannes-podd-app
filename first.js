var builder = require("xmlbuilder");
var express = require("express");
var fs = require("fs");

var router = express.Router();
var dirPath = "./hannes.xml";



// FIREBASE

var admin = require('firebase-admin');

var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

db.collection('hejsan').doc('hej').get()
.then(snap => { console.log(snap)})
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

var rssData = {

}

var doc = builder
	.create("rss").att("version","1.0").att("xmlns:itunes", "http://www.itunes.com/dtds/podcast-1.0.dtd").att("xmlns:atom", "http://www.w3.org/2005/Atom")
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
