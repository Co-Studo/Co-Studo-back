FROM node:18-slim

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build
RUN rm -rf ./src

CMD [ "node", "build/src/init.js" ]