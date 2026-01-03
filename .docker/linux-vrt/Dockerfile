FROM mcr.microsoft.com/playwright:v1.56.0-jammy

# Install Bun
RUN apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./
COPY apps/fujimatsu/package.json ./apps/fujimatsu/
COPY apps/roppoh/package.json ./apps/roppoh/
COPY apps/zunpachi/package.json ./apps/zunpachi/
COPY packages/better-auth/package.json ./packages/better-auth/
COPY packages/better-auth-database/package.json ./packages/better-auth-database/
COPY packages/shadcn/package.json ./packages/shadcn/

# Install dependencies
RUN bun install --frozen-lockfile

# Set working directory to the app
WORKDIR /app/apps/roppoh

# Run tests
CMD ["bun", "run", "test:visual"]
