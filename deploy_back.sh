#!/bin/bash
set -e  # Exit immediately if any command fails

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "❌ Error: jq is not installed. Please install it with 'sudo apt install jq'"
    exit 1
fi

# Navigate to the backend directory
cd "$(dirname "$0")/back"

# 1. Remove node_modules and install dependencies
echo "🧹 Removing node_modules..."
rm -rf node_modules
echo "📦 Installing dependencies..."
yarn install

# 2. Get the package.json version and the current date
PACKAGE_VERSION=$(jq -r .version package.json)
DATE_FORMAT=$(date +"V. %B %d(%A) %Y - $PACKAGE_VERSION")

# 2.1 Overwrite VERSION in .env
echo "✍️  Updating VERSION in .env..."
sed -i "s/^VERSION=.*/VERSION=\"$DATE_FORMAT\"/" .env

# 3. Restart PM2 (Try graceful reload first, fallback to full restart if needed)
echo "🚀 Reloading back-dev in PM2..."
if ! pm2 gracefulReload back-dev --update-env; then
    echo "⚠️  Graceful reload failed, performing full restart..."
    pm2 delete back-dev || true
    pm2 start npm --name "back-dev" -- run start
fi

# 4. Restart Nginx
echo "🔄 Restarting Nginx..."
systemctl restart nginx

echo "✅ Deployment completed successfully!"

