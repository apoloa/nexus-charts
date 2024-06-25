FROM node:20

# Update and install certificates
RUN apt-get update && apt-get install -y ca-certificates

WORKDIR /usr/src/app

# Copy package.json y package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the code 
COPY . .

# Expose
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]