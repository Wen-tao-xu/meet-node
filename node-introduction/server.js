let http = require('http');
let url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;
    console.log(`Request for: ${pathname}`);
    route(handle, pathname, response, request);

  }
  
  let server = http.createServer(onRequest)
  server.listen(8888)
  console.log('http://localhost:8888')
}

exports.start = start
