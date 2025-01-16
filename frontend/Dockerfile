FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY ./nginx /etc/nginx

COPY --from=builder /app/dist /app
