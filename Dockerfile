# Build Stage 1
# Builds our ui so we can drop it into
# the public folder of our express server

FROM node:18-alpine AS uibuild

WORKDIR /usr/src/app
COPY ./ui .
RUN npm install
ENV VITE_API_URL=/steam/
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --omit=dev
COPY . .
RUN npm run build
COPY --from=uibuild /usr/src/app/dist ./dist/public
EXPOSE 3000
CMD npm start