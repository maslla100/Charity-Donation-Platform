#!/bin/bash

# Ensure the script is executed with superuser privileges
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

# Navigate to the project root directory (adjust path as needed)
cd /path/to/your/project/root

echo "Installing global dependencies..."
npm install -g concurrently

echo "Installing client dependencies..."
cd client
npm install
npm run build
cd ..

echo "Installing server dependencies..."
cd server
npm install
cd ..

echo "All dependencies installed successfully."

# Add additional commands if you need to execute database migrations, seed databases, etc.
echo "Running database migrations..."
cd server
npm run migrate

echo "Seeding database..."
npm run seed

cd ..

echo "Setup completed successfully. Starting application..."
# You can use PM2 or another process manager to start your app here, e.g.,
# pm2 start ecosystem.config.js
