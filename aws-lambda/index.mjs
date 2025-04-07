export const handler = async event => {
  if (event.body) {
    const { method, url, headers, body } = JSON.parse(event.body);

    console.log('proxy ' + method + url);
    const proxyRes = await fetch(url, {
      method,
      headers,
      body: body ? Buffer.from(body, 'base64') : null
    });
    const statusCode = proxyRes.status;
    const responseHeaders = Object.fromEntries(proxyRes.headers);

    const responseBody = await proxyRes.arrayBuffer();

    console.log('new response ', responseBody, statusCode, responseHeaders);


    // 长度会重新计算
    delete responseHeaders['content-length'];

    // 连接状态不需要
    delete responseHeaders['connection'];

    // 需透传编码，但 aws 网关有 base64 限制，所以需另外返回
    const contentEncoding = responseHeaders['content-encoding'];
    delete responseHeaders['content-encoding'];
    responseHeaders['x-aws-proxy-content-encoding'] = contentEncoding;

    const base64Response = new Uint8Array(responseBody);
    return {
      isBase64Encoded: true,
      statusCode: statusCode,
      headers: responseHeaders,
      body: Buffer.from(base64Response).toString('base64')
    };
  }

  const img = new Uint8Array([
    105, 109, 97, 103, 101, 32, 110, 111, 116, 32, 102, 111, 117, 110, 100, 32,
    40, 105, 100, 58, 32, 97, 57, 54, 48, 53, 48, 52, 51, 45, 56, 48, 55, 100,
    45, 52, 54, 52, 53, 45, 98, 52, 102, 100, 45, 97, 51, 50, 98, 51, 57, 50,
    55, 48, 54, 98, 98, 41, 10
  ]);
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      'content-type': 'image/jpg'
    },
    body: Buffer.from(img).toString('base64')
  };
};
