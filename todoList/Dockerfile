FROM node:lts-alpine
 
WORKDIR /app

COPY ./todoList/package*.json ./
RUN npm install

COPY ./todoList .

CMD ["npm", "run", "serve"]