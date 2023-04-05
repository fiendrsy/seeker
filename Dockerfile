FROM node:19.7-alpine

WORKDIR /app/seeker

COPY package*.json ./

RUN npm install

ADD . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]