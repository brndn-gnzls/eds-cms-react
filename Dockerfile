FROM node:20 AS builder
ARG namespace

WORKDIR /app
COPY . ./

RUN export NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NODE_ENV=$namespace

RUN npm install
RUN npm run build

FROM node:20
WORKDIR /app

RUN npm install -g serve@14.2.4
COPY --from=builder /app/build ./

EXPOSE 5000
CMD ["serve", "-s", "-p", "5000", "."]