function route(handle, pathname, response, request) {
  if(typeof handle[pathname] === 'function') {
    handle[pathname](response, request)
  }else{
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("404 Noy found");
    response.end();
  }
}

exports.route = route
