FROM node:lts as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY gzip.conf /etc/nginx/conf.d
