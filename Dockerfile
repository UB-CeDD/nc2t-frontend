# Use a Node.js image for development
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the development server runs on
EXPOSE 3000

# The command to start the development server
CMD ["npm", "run", "dev"]
