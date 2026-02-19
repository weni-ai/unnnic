FROM node:22.17.1-alpine3.22 AS builder

WORKDIR /home/app

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

RUN yarn build-storybook

FROM nginxinc/nginx-unprivileged:1

COPY --from=builder /home/app/storybook-static /usr/share/nginx/html/
