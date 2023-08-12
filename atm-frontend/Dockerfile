# Use an official Node.js runtime as the base image
FROM node:20.3.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local src files to the container's workspace.
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "start"]
