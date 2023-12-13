
FROM node:alpine3.18 as build

WORKDIR /app
COPY package.json ./
RUN yarn install --production
COPY . /app
RUN yarn run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
CMD ["nginx", "-g", "daemon off;"]
