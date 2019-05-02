FROM node:8

RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser


# Create app directory
WORKDIR /usr/src/app

# Copy app source
COPY . .

ENV PORT=9000

RUN npm install && \
    npm run build

WORKDIR /usr/src/app/server

RUN npm install --only=production

EXPOSE 9000


USER appuser

CMD [ "npm", "start" ]
