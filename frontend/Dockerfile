# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to root of the working directory in the image
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy your React frontend code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port on which your React app will run (usually 80)
EXPOSE 3000

# Serve the production-ready React app
CMD ["npx", "serve", "-s", "build"]
