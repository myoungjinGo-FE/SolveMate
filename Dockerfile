FROM node:20.17.0-alpine

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 프로젝트 파일 복사
COPY . .

# 의존성 설치 및 빌드
RUN pnpm install
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]