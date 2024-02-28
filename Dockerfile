FROM node:20.11.0-alpine3.19

WORKDIR /project

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ENV TZ=UTC

COPY package*.json /project/
COPY . /project

WORKDIR /project
RUN rm -rf node_modules
RUN npm ci

RUN npm i -g @angular/cli