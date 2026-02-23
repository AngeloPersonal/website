FROM alpine:latest AS development

# Set build arguments and environment variables
ARG PROJECT_ID
ENV SANITY_PROJECT_ID=${PROJECT_ID}

# Enable PNPM
RUN apk add --update nodejs npm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack 
RUN corepack enable

# Install dependencies
WORKDIR /app
COPY package.json *lock.yaml ./
RUN pnpm install 
# --frozen-lockfile # TODO: add lockfile from workspace

# Build studio
COPY . .
RUN pnpm build

CMD ["pnpm", "dev"]


FROM joseluisq/static-web-server:2.41-alpine AS production

WORKDIR /app
COPY --from=development /app/dist .

CMD ["static-web-server", "-p", "3333", "-d", "./", "-g", "trace"]