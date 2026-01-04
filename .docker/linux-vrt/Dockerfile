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
COPY apps/ura-roppoh/package.json ./apps/ura-roppoh/
COPY apps/zunpachi/package.json ./apps/zunpachi/
COPY packages/better-auth/package.json ./packages/better-auth/
COPY packages/better-auth-database/package.json ./packages/better-auth-database/
COPY packages/domain/package.json ./packages/domain/
COPY packages/domain-impl/package.json ./packages/domain-impl/
COPY packages/presentation-trpc/package.json ./packages/presentation-trpc/
COPY packages/shadcn/package.json ./packages/shadcn/

# Install dependencies
RUN bun install --frozen-lockfile
