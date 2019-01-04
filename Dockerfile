FROM node:10.15.0-alpine

RUN apk --update add tzdata && \
    rm -rf /var/cache/apk/* && \
    npm install -g yarn

WORKDIR /workdir
# EXPOSE 3000
CMD ["node", "./packages/web-authn-app/lib/index.js"]

COPY . /workdir

RUN yarn --no-progress && \
    npx lerna run tsc && \
    npx lerna bootstrap && \
    npx lerna run build

