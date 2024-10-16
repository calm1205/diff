FROM node:18 AS development

RUN apt-get update && apt-get install -y git
WORKDIR /app

RUN git init

COPY package*.json ./
RUN npm ci

COPY index.html \
    tsconfig.json \
    vite.config.ts \
      ./
COPY src ./src
COPY fixtures ./fixtures
