import http from 'node:http'
import process from 'node:process'

// function:
function getBody(request) {
  return new Promise((resolve) => {
    const bodyParts = [];
    let body;
    request.on('data', (chunk) => {
      bodyParts.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(bodyParts);
      resolve(body)
    });
  });
}
// Create an
const server = http.createServer(async (req, res) => {
  const url = `https://${req.headers.host}${req.url || ''}`
  console.log('proxy ', req.method, ' ',  url);

  let body = null;

  if (req.method === 'POST') {
    body = await getBody(req);
  }

  try {
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
          body: body ? Buffer.from(body).toString('base64') : null,
        })
      }
    )

    const headers = Object.fromEntries(proxyRes.headers)
    const responseBody = await proxyRes.arrayBuffer();

    const contentEncoding = headers['x-aws-proxy-content-encoding'];
    if (contentEncoding) {
      console.log('proxy ', req.method, ' ',  url, ' ', contentEncoding );
      delete headers['x-aws-proxy-content-encoding'];
      // headers['content-encoding'] = contentEncoding;
    }

    console.log('proxy ', req.method, ' ',  url, ' ', headers );
    res.writeHead(proxyRes.status, headers)
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
