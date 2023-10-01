FROM node:18
WORKDIR /app

# Required to build with Node 18
ENV NODE_OPTIONS --openssl-legacy-provider


COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV PORT 80
EXPOSE $PORT

CMD ["node" "server.js"]