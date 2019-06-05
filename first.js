var builder = require('xmlbuilder');
var express = require('express');
var router  = express.Router();
var fs = require('fs');

var dirPath = './hannes.xml'


var doc = builder.create('root')
  .ele('xmlbuilder')
    .att('for', 'node-js')
    .ele('repo')
      .att('type', 'git')
      .txt('git://github.com/oozcitak/xmlbuilder-js.git') 
      .up()
    .up()
  .ele('test')
  .txt('complete')
.end({ pretty: true });

var xmldoc = doc.toString({ pretty: true });

fs.writeFile(dirPath, xmldoc, function(err) {
  if(err) { return console.log(err); } 
  console.log("The file was saved!");
  res.render('index', { title: 'Generate XML using NodeJS' });

}); 

console.log(doc.toString());