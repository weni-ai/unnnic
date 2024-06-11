FROM node:20.14.0-alpine3.19 as builder

WORKDIR /home/app

COPY ./package.json ./

RUN npm i

COPY . .

RUN npm run build-storybook

FROM nginxinc/nginx-unprivileged:1

COPY --from=builder /home/app/storybook-static /usr/share/nginx/html/
