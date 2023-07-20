FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

COPY . .

RUN npm run build

EXPOSE 5001

CMD ["npx", "nodemon", "dist/app.js"]
