FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json to app directory
COPY package*.json ./

# Install dependencies
RUN npm ci 

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Expose listening port
EXPOSE 8080

# Run app
CMD [ "npm", "start" ]