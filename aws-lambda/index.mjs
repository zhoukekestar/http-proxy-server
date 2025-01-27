export const handler = async event => {
  if (event.body) {
    const { method, url, headers } = JSON.parse(event.body)

    //   console.log('proxy ' + method + url)
    const proxyRes = await fetch(url)
    const statusCode = proxyRes.status
    const responseHeaders = Object.fromEntries(proxyRes.headers)
    const responseBody = await proxyRes.arrayBuffer()

    //   console.log('new response ', responseBody, statusCode, responseHeaders)

    delete responseHeaders['content-length']
    delete responseHeaders['connection']
    delete responseHeaders['content-encoding']

    const base64Response = new Uint8Array(responseBody)
    return {
      isBase64Encoded: true,
      statusCode: statusCode,
      headers: responseHeaders,
      body: Buffer.from(base64Response).toString('base64')
    }
  }

  // Just for Test
  const img = new Uint8Array([
    105, 109, 97, 103, 101, 32, 110, 111, 116, 32, 102, 111, 117, 110, 100, 32,
    40, 105, 100, 58, 32, 97, 57, 54, 48, 53, 48, 52, 51, 45, 56, 48, 55, 100,
    45, 52, 54, 52, 53, 45, 98, 52, 102, 100, 45, 97, 51, 50, 98, 51, 57, 50,
    55, 48, 54, 98, 98, 41, 10
  ])
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      'content-type': 'image/jpg'
    },
    body: Buffer.from(img).toString('base64')
  }
}
