const http = require('http')
const fs = require('fs')
const httpServer = http.createServer()

httpServer.on('request', (req, res) => {
  if (req.url === '/') {
    res.end(fs.readFileSync('index.html'))
    return
  }
  if (req.url === '/upload') {
    const fileName = req.headers['file-name']
    req.on('data', (chunk) => {
      fs.appendFileSync(fileName, chunk)
    })
    res.end('uploaded!')
  }
})

const PORT = 3000

httpServer.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
