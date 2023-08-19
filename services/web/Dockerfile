FROM node:bullseye-slim

ENV NODE_ENV=production

WORKDIR /usr/src

ADD package.json /usr/src/package.json

RUN yarn install

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

COPY . /usr/src

CMD [ "yarn", "run", "production" ]
