FROM node:14.17.0-buster as builder

ARG BUILDENV
WORKDIR /app

COPY package.json ./



RUN npm install --force -g pnpm@7 --registry=https://nexus2.cbim.org.cn/repository/npm-public/

#RUN pnpm config set sass_binary_site=http://10.80.253.63:8081/repository/node-saas/
RUN pnpm config set sass_binary_site=http://nexus2.cbim.org.cn/repository/node-saas/
RUN pnpm install --registry=https://registry.npmmirror.com
COPY . .

RUN pnpm ${BUILDENV}

FROM nginx:1.21.0-alpine as prod
ENV TZ Asia/Shanghai
ENV LANG en_US.UTF-8

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
