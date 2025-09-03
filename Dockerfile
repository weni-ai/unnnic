FROM node:22.17.1-alpine3.22 as builder

WORKDIR /home/app

COPY ./package.json ./

RUN npm i

COPY . .

RUN npm run build-storybook

FROM nginxinc/nginx-unprivileged:1

COPY --from=builder /home/app/storybook-static /usr/share/nginx/html/
