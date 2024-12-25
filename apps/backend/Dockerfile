FROM node:18
WORKDIR /app
COPY ../package.json ../package-lock.json ./
RUN npm install --no-audit --prefer-offline
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/apps/backend/main.js"]
