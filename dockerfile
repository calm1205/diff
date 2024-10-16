FROM node:18 AS development

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY index.html \
    tsconfig.json \
    vite.config.ts \
      ./
COPY src ./src
COPY fixtures ./fixtures
