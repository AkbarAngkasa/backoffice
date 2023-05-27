# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the remaining app files to the container
COPY . ./

# Build the React app
RUN yarn run build

# Install serve globally
RUN yarn global add serve

#create nginx-server
FROM nginx:stable-alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app to the Nginx HTML directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 on the container
EXPOSE 80

# Start Nginx and run it in the foreground with the "daemon off;" option
CMD ["nginx", "-g", "daemon off;"]

