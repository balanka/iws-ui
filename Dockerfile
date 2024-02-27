
FROM node:alpine3.18 as build

WORKDIR /app
COPY package.json ./
RUN yarn install --production
COPY . /app
ARG REACT_APP_HOST_IP_ADDRESS
ENV REACT_APP_HOST_IP_ADDRESS $REACT_APP_HOST_IP_ADDRESS
RUN yarn run build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
#CMD ["bash -c",  "envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/nginx.conf"]
CMD ["nginx", "-g", "daemon off;"]
