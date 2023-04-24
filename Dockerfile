# Use an official Node.js runtime as a parent image
FROM node:15.6.0

# Set the working directory to /app
WORKDIR /public

# Copy the package.json and package-lock.json files to the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vue.js application
RUN npm run build

EXPOSE 8080

# Set the production-ready command to run the Vue.js application
CMD ["npm", "run", "serve"]