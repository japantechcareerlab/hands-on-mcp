.PHONY: install build dev start inspector help

help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make build      - Build the project"
	@echo "  make dev        - Run in development mode"
	@echo "  make start      - Start the server"
	@echo "  make inspector  - Run with MCP inspector"

install:
	mise exec -- bun install

build:
	mise exec -- bun run build

dev:
	mise exec -- bun run dev

start:
	mise exec -- bun run start

inspector:
	CLIENT_PORT=5173 SERVER_PORT=6277 mise exec -- bunx @modelcontextprotocol/inspector -- bun run src/index.ts
