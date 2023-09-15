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
COPY ./private/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY ./private/privkey.pem /etc/nginx/certs/privkey.pem

COPY ./private/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
