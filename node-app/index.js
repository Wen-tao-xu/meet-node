const fs = require('fs')
const path = require('path')
const http = require('http')
const zlib = require('zlib')
const Routers = require('./router')
const port = 8888
const { getContentType } = require('./utils/index.js')

const server = http.createServer((req, res) => {
  // 静态资源映射,并对资源做gzip压缩
  if (req.url.includes('.') || req.url === '/') {
    const acceptEncoding = req.headers['accept-encoding']
    const filepath = path.join(__dirname, './app', req.url === '/' ? 'index.html' : req.url)
    const headers = {
      'content-type': getContentType(path.extname(filepath).slice(1))
    }
    if (acceptEncoding.includes('gzip')) {
      const gzip = zlib.createGzip()
      res.writeHead(200, {
        ...headers,
        'Content-Encoding': 'gzip'
      })
      fs.createReadStream(filepath)
        .pipe(gzip)
        .pipe(res)
    } else {
      res.writeHead(200, headers)
      fs.createReadStream(filepath).pipe(res)
    }
  } else {
    // 接口
    Routers.init(req, res)
  }
})

server.listen(port, () => {
  console.log(`TodoList Server listen on ${port}`)
})