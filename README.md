
# QuickStart

## Step 1

  Clone this repo to local.

```sh
$ git clone 
$ npm i
```

## Step 2

  Start Local Server by `bash ./start.sh`

> You should install whistle's CA before you porxy HTTPS request.


  Set whistle rules:

```txt
* reqScript:///The/path/to/your/repo/reqScript.js

# Example
# * reqScript:///Users/Bob/Downloads/http-proxy/reqScript.js
```


## Step 3 

  Start Remote Server.

* Deploy the AWS Lambda with `aws-lambda/index.mjs`


## Done

  Set Chrome proxy by `SwitchyOmega` or something else. Set proxy to `whistle`'s default `HTTP_PROXY_PORT:8899`

  All Done! And Enjoy~


# Notes


