#!/bin/bash

npx w2 start

# source ./.env 
# echo $LAMBDA_URL
node --env-file='.env' index.mjs