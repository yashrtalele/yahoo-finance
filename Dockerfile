FROM node:18-slim

RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    fonts-liberation \
    libappindicator3-1 \
    libnspr4 \
    libxtst6 \
    xdg-utils \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV CHROME_BIN=/usr/bin/chromium

# FROM ghcr.io/puppeteer/puppeteer:23.7.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "index.js" ]

