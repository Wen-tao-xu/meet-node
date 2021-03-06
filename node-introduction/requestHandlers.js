let exec = require("child_process").exec;
let querystring = require("querystring");
let fs = require("fs");
let formidable = require("formidable");

function start(response) {
  var body = '<html>'+ '<head>'+ '<meta http-equiv="Content-Type" '+ 'content="text/html; charset=UTF-8" />'+ '</head>'+ '<body>'+ '<form action="/upload" enctype="multipart/form-data" '+ 'method="post">'+ '<input type="file" name="upload">'+
  '<input type="submit" value="Upload file" />'+ '</form>'+ '</body>'+ '</html>';
  response.writeHead(200, {"Content-type": "text/html"});
  response.write(body);
  response.end();
}

function upload(response, request) {
  let form = new formidable.IncomingForm(); 
  form.parse(request, function(error, fields, files) {
    fs.renameSync(files.upload.path, "./tmp/test.png"); response.writeHead(200, {"Content-Type": "text/html"}); response.write("received image:<br/>"); response.write("<img src='/show' />"); response.end();
  })
}

function show(response) {
  fs.readFile("./tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"}); 
      response.write(error + "\n"); response.end(); 
    }else{
      response.writeHead(200, {"Content-Type": "image/png"}); response.write(file, "binary"); 
      response.end();
    }
  })
}

exports.start = start;
exports.upload = upload;
exports.show = show;
