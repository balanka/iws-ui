#FROM node:alpine3.18 as build
FROM node:21.6.2-alpine3.18 as build

WORKDIR /app
COPY package.json ./
RUN yarn install --production
COPY . /app
ARG REACT_APP_HOST_IP_ADDRESS
ARG REACT_APP_PORT
ENV REACT_APP_HOST_IP_ADDRESS $REACT_APP_HOST_IP_ADDRESS
ENV REACT_APP_PORT $REACT_APP_PORT
RUN yarn run build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
#CMD ["bash -c",  "envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/nginx.conf"]
CMD ["nginx", "-g", "daemon off;"]
