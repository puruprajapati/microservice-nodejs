# specify a base image
FROM node:alpine

WORKDIR /app

# install dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]