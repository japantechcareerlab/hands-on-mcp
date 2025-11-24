.PHONY: install build dev start inspector

install:
	bun install

build:
	bun run build

dev:
	bun run dev

start:
	bun run start

inspector:
	CLIENT_PORT=5173 SERVER_PORT=6277 bunx @modelcontextprotocol/inspector -- bun run src/index.ts
