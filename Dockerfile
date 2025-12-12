
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the frontend code
COPY . .

# Build Vite production bundle (dist/)
RUN npm run build



# ============================
# 2️⃣ RUN STAGE - Nginx Serve
# ============================
FROM nginx:1.25-alpine AS runner

# Clean default nginx html folder
RUN rm -rf /usr/share/nginx/html/*

# Copy the built frontend from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (for EC2 / Docker)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
