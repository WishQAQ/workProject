FROM node:8.9.4-alpine

LABEL maintainer="jahv<me@cjahv.com>"

RUN mkdir /module
COPY package.json /module

WORKDIR /module

RUN yarn install --ignore-scripts --registry=http://maven.oakhit.com/repository/npm-public/ \
&& cd node_modules \
&& rm -rf **/*.md **/readme **/test* **/*.dll **/*.exe **/*.txt **/*.sfx **/*.ttt **/*.map **/LICENSE \
&& cd .. \
&& rm -f package.json yarn.lock