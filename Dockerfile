FROM node:24-alpine AS BUILDER

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=BUILDER /app/dist /usr/share/nginx/html/

EXPOSE 80
