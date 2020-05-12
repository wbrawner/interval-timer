FROM nginx:latest
COPY gzip.conf /etc/nginx/conf.d
COPY src /usr/share/nginx/html

