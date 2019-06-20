const builder = require("xmlbuilder");
const express = require("express");
const fs = require("fs");

const router = express.Router();
const dirPath = "./hannes.xml";

// FIREBASE
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://maggan-b2fb6.firebaseio.com"
});

const db = admin.database();
const ref = db.ref("kajak");

const doc = builder
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

const xmldoc = doc.toString({ pretty: true });

fs.writeFile(dirPath, xmldoc, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
  // res.render("index", { title: "Generate XML using NodeJS" });
});

class Maggan {
  constructor() {
    this.number = "";
	}

  set number(val) {
    ref.on(
      "value",
      function(snapshot) {
				const value = snapshot.val();
				this.number = value;
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
	}
	
}

const magan = new Maggan();
