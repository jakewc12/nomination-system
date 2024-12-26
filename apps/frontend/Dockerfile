# Stage 1: Build
FROM node:18 AS build
WORKDIR /app
COPY ../package.json ../yarn.lock ./
RUN yarn install --no-audit --prefer-offline
COPY . .

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist/apps/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]