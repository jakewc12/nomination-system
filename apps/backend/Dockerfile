FROM node:18
WORKDIR /app
COPY ../package.json ../yarn.lock ./
RUN yarn install --no-audit --prefer-offline
COPY . .
EXPOSE 3000
CMD ["node", "dist/apps/backend/main.js"]
