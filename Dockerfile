FROM node:14.17.0-alpine AS development

WORKDIR /code

COPY package.json /code/package.json
COPY pnpm-lock.yaml /code/pnpm-lock.yaml

RUN npm config set registry https://registry.npm.taobao.org \
    && npm install -g pnpm \
    && pnpm install

COPY . /code

EXPOSE 5173

# run the app linsting on port 5173
CMD ["pnpm", "start" ]

FROM development AS build

RUN npm run build

FROM nginx:1.21.5-alpine

COPY --from=build /code/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /code/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
