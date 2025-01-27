
# QuickStart

  The HTTP proxy server employs a middleware hack to handle HTTPS requests via Whistle, subsequently routing them to AWS Lambda. The Lambda function simply executes a Fetch operation and returns the result to the browser. Please be advised that this implementation is solely intended for website viewing functionality.


  该HTTP代理服务器采用中间件技巧，通过Whistle处理HTTPS请求，随后将其路由到AWS Lambda。Lambda函数仅执行Fetch操作并将结果返回给浏览器。请注意，此实现仅用于网站浏览功能。

## Step 1

  Clone this repo to local.

```sh
$ git clone git@github.com:zhoukekestar/http-proxy-server.git
$ npm i
```

## Step 2 

  Start Remote Server.

* Deploy the AWS Lambda with `aws-lambda/index.mjs`

  Get the Lamba's HTTP Gateway URL, something like `https://xxx.ap-southeast-1.amazonaws.com/xxx-123456/`. 

  And set this to YOUR local `.env` file like

```bash
# .env file
LAMBDA_URL=https://xxx.ap-southeast-1.amazonaws.com/xxx-123456/
```


## Step 3


  Start Local Server by `bash ./start.sh`

> You should install whistle's CA before you porxy HTTPS request.


  Set whistle rules:

```txt
* reqScript:///The/path/to/your/repo/reqScript.js

# Example
# * reqScript:///Users/Bob/Downloads/http-proxy/reqScript.js
```



## Done

  Set Chrome proxy by `SwitchyOmega` or something else. Set proxy to `whistle`'s default `HTTP_PROXY_PORT:8899`

  All Done! And Enjoy~


# Notes

![Image](https://github.com/user-attachments/assets/a7ad4897-b948-4744-9ee3-acdbc2c1a02e)

# Limits

* DO not support sockets
* DO not suuport stream
  * Maybe you can try [Vless on Cloudflare](https://zhoukekestar.github.io/notes/2023/10/22/CF-workers.html). This http-proxy-server is used by some sites which Cloudflare can't visit directly.
 
# TODOS

* [ ] Support POST method.

