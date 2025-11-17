# Frontend Dockerfile
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy React app
COPY . .

# React dev server port
ENV PORT=3000
EXPOSE 3000

# Start React dev server
CMD ["npm", "start"]
