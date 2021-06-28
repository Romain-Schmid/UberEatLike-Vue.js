FROM node:14

WORKDIR /nodejs/app

RUN npm install  -g nodemon typescript  ts-node

COPY *.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]