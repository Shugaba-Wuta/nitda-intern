FROM node:alpine

WORKDIR /usr/src/app

ADD package.json /usr/src/package.json

RUN yarn install

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . /usr/src/app

CMD [ "yarn", "run", "dev" ]