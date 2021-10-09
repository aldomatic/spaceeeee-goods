FROM node:14
WORKDIR /usr/src/spaceee
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "boostrap" ]