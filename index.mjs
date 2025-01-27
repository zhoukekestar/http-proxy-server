import http from 'node:http'

// Create an 
const server = http.createServer(async (req, res) => {
  const url = `https://${req.headers.host}${req.url || ''}`
  console.log('proxy', url);

  const proxyRes = await fetch(
    process.env.LAMBDA_URL,
    {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        headers: req.headers,
        method: req.method,
        // body: req.body
      })
    }
  )
  try {
    const headers = Object.fromEntries(proxyRes.headers)
    res.writeHead(proxyRes.status, headers)
    const responseBody = await proxyRes.arrayBuffer();
    res.write( Buffer.from(responseBody));
  } catch (er) {
    console.log(er)
    res.end('err')
  }
})

// HTTP tunneling proxy not supported
server.on('connect', (req, clientSocket, head) => {
  console.log('connect', req.url)
  console.log('HTTP proxy: CONNECT method is not supported! HTTP tunneling proxy not supported')
})

console.log(`PROXY TO ${process.env.LAMBDA_URL}`)
server.listen(5567, '0.0.0.0')
