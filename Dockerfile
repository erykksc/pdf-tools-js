FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Copy only necessary files to the build context
COPY index.html *.json *.js *.ts ./
COPY public/ public/
COPY src/ src/
RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html/

EXPOSE 80
