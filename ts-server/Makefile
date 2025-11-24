.PHONY: install build dev start inspector help

help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make build      - Build the project"
	@echo "  make inspector  - Run with MCP inspector"

install:
	bun install

build:
	bun run build

inspector:
	CLIENT_PORT=5173 SERVER_PORT=6277 bunx @modelcontextprotocol/inspector -- bun run src/index.ts
