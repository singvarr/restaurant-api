FROM node:20-slim
WORKDIR /app
RUN apt-get update && apt-get install -y procps
COPY ./package*.json ./
RUN npm ci
ADD ./ ./
EXPOSE 3000
CMD npm run start:debug
