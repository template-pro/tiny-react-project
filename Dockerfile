FROM node:14.17.0-alpine AS development

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm config set registry https://registry.npm.taobao.org \
    && npm ci
COPY . /code

EXPOSE 3000

# run the app linsting on port 3000
CMD ["npm", "start" ]

FROM development AS build

RUN npm run build

FROM nginx:1.21.5-alpine

COPY --from=build /code/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /code/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
