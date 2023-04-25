FROM node:18.12.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
# RUN npm build

CMD ["npm","run","start"]
# Stage 2 - Create the production image
# FROM node:19-alpine 
# WORKDIR /app
# RUN npm install -g serve
# COPY --from=builder /app/build /app
# EXPOSE 3000
# CMD ["serve","-s","."]z