FROM node:20-slim
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
ADD ./ ./
CMD npm run start:dev
EXPOSE $PORT
