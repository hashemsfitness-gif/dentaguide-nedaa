FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose ports
EXPOSE 3000
EXPOSE 8400

CMD ["npm", "run", "dev"]
