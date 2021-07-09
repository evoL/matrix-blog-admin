FROM node:14

RUN git clone https://github.com/evoL/matrix-blog-admin

WORKDIR matrix-blog-admin

ADD .env .env

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
