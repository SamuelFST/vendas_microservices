FROM node:16-alpine
WORKDIR .
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8080
CMD ["node", "-r", "sucrase/register", "server.js"]
