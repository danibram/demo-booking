FROM node:13-alpine
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm ci
RUN mkdir -p /app
RUN cp -a /tmp/node_modules /app/

WORKDIR /app

EXPOSE 3001

CMD ["npm", "run", "dev"]
