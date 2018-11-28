FROM node:6
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app
RUN npm install
COPY . .
EXPOSE 4200
cmd ["npm","start"]
