#!/bin/bash

echo "🚀 Setting up Eternal UI Enhanced..."

# Install dependencies
npm install

# Create required directories
mkdir -p {
  public/assets/icons,
  docs/implementation,
  tests/components,
  tests/e2e
}

# Copy environment variables
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "📝 Created .env.local - please update with your values"
fi

# Setup git hooks
npx husky install

echo "✅ Setup complete! Run 'npm run dev' to start developing."