FROM node:latest
WORKDIR /server.js

COPY package*.json .

RUN npm install
COPY . .

CMD [ "node","server.js" ]
