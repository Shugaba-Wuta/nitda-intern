FROM node:bullseye-slim

ENV NODE_ENV=production

WORKDIR /usr/app

ADD package.json /usr/app/package.json

RUN yarn install

# add `/usr/app/node_modules/.bin` to $PATH
ENV PATH /usr/app/node_modules/.bin:$PATH

COPY . /usr/app

CMD [ "yarn", "run", "dev" ]