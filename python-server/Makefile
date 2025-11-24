.PHONY: install dev start inspector help

help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make inspector  - Run with MCP inspector"

install:
	uv sync

inspector:
	CLIENT_PORT=5174 SERVER_PORT=6278 bunx @modelcontextprotocol/inspector -- mcp run main.py
