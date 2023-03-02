FROM node:16-alpine
WORKDIR .
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 10000
CMD ["node", "-r", "sucrase/register", "index.js"]
