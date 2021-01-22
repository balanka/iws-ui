FROM node:15.5.1

WORKDIR /Users/iwsmac/Downloads/tools/js/react/iws-ui

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]