FROM node:14-alpine

RUN apk update
RUN apk upgrade

WORKDIR /app

ADD . ./

RUN npm install

EXPOSE 3000

RUN npm run build

CMD [ "node", "build" ]
