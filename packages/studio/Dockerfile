FROM alpine:latest AS development

# Set build arguments and environment variables
ARG PROJECT_ID
ENV PORT=3000

# Enable PNPM
RUN apk add --update nodejs npm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack 
RUN corepack enable

# Hotfix: ProjectID missing error
RUN npm install --global sanity@latest

# Install dependencies
WORKDIR /app
COPY package.json *lock.yaml ./
RUN pnpm install 
# --frozen-lockfile # TODO: add lockfile from workspace root

# Build studio
COPY . .
ENV SANITY_STUDIO_PROJECT_ID=${PROJECT_ID}
RUN echo "SANITY_STUDIO_PROJECT_ID='${PROJECT_ID}'" >> .env.local
RUN pnpm build

CMD ["pnpm", "start"]

EXPOSE ${PORT}


FROM joseluisq/static-web-server:2.41-alpine AS production

WORKDIR /app
COPY --from=development /app/dist .

CMD ["static-web-server", "-p", "${PORT}", "-d", "./", "-g", "trace"]