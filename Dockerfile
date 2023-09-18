# build stage
FROM node:18.16.1-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN apk add --no-cache tzdata
ENV TZ=Asia/Seoul

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
