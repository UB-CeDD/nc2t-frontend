# Use Node.js 22 as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install SWC globally (in case you need it for compilation)
RUN npm install -g @swc/cli @swc/core

# Expose the port the app runs on
EXPOSE 3000

# Start the React development server
CMD ["npm", "run", "dev"]