FROM node:16-alpine
WORKDIR .
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8082
CMD ["node", "-r", "sucrase/register", "server.js"]
