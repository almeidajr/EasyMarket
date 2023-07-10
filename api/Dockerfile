FROM node:lts

WORKDIR /usr/app/emapi
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . . 
EXPOSE 3333

CMD ["yarn","start:dev"] 
