FROM node:16.18-slim

# Create and set directory to the app directory
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Switch privileged user
USER node

COPY --chown=node:node . .

# Create and set directory to the app directory
WORKDIR /home/node/app

COPY /dist /home/node/app/dist
COPY /node_modules/ /home/node/app/node_modules
COPY /package.json /home/node/app/package.json

# Expose the listening port
EXPOSE 8080

CMD ["npm", "run", "local"]
