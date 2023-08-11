FROM node:18-alpine as builder

WORKDIR /home/app

COPY ./package.json ./

RUN npm i

COPY . .

RUN npm run build-storybook

FROM nginxinc/nginx-unprivileged:1

COPY --from=builder /home/app/storybook-static /usr/share/nginx/html/
