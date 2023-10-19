FROM node:17-alpine as angular

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g @angular/cli@latest
RUN npm install


COPY . .

EXPOSE 4200

CMD ["ng","serve","--host","0.0.0.0", "--disableHostCheck=true", "--poll", "100"]

