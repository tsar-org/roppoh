FROM mcr.microsoft.com/playwright:v1.56.0-jammy

# Install Bun
RUN apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/

# Install dependencies
RUN bun install --frozen-lockfile

# Set working directory to the app
WORKDIR /app/apps/roppoh

# Run tests
CMD ["bun", "run", "test:visual"]
