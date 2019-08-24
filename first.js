// Dependencies
var builder = require("xmlbuilder");
var fs = require("fs");
var dirPath = "./hannes.rss";

// FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://maggan-b2fb6.firebaseio.com/"
});

var db = admin.database();
var ref = db.ref("rss");

// Factory
ref.once("value", function(snapshot) {
  console.log(snapshot.val());

  var obj = snapshot.val();
  var doc = builder.create(obj).end({ pretty: true })
  var xmldoc = doc.toString({ pretty: true });

  fs.writeFile(dirPath, xmldoc, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  })
})

