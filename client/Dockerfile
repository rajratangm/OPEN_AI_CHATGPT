# Use a Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install client dependencies
RUN npm install

# Copy the client application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the client application
CMD ["npm", "start"]
