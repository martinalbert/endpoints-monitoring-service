FROM node:14

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install

RUN npm build

COPY . .

CMD [ "npm", "start" ]