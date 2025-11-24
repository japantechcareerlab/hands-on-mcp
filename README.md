# Hands-on MCP (Model Context Protocol)

This project demonstrates MCP server implementations in both TypeScript and Python, featuring a simple Todo List application.

## Project Structure

```
hands-on-mcp/
├── ts-server/              # TypeScript MCP server
│   ├── .mise.toml          # Node.js 20
│   ├── src/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── tools/
│   ├── package.json
│   └── Makefile
└── python-server/          # Python MCP server
    ├── .mise.toml          # Python 3.11, Node.js 20
    ├── src/
    │   ├── index.py
    │   ├── types.py
    │   └── tools/
    ├── requirements.txt
    ├── pyproject.toml
    └── Makefile
```

## Prerequisites

- [mise](https://mise.jdx.dev/) - Runtime version manager

## Setup

Install mise (if not already installed):

```bash
# macOS/Linux
curl https://mise.run | sh

# Or with Homebrew
brew install mise
```

Each server has its own `.mise.toml` configuration and will automatically install required tools when you run commands.

## Quick Start

### TypeScript Server

```bash
cd ts-server

# Install dependencies
make install

# Run in development mode
make dev

# Run with inspector
make inspector
```

### Python Server

```bash
cd python-server

# Install dependencies
make install

# Run in development mode
make dev

# Run with inspector
make inspector
```

## Features

Both servers implement the same Todo List functionality:

- **add_todo**: Add a new todo item
- **list_todos**: List all todos with optional filtering
- **complete_todo**: Mark a todo as complete

## Documentation

- [TypeScript Server](./ts-server/README.md)
- [Python Server](./python-server/README.md)

## MCP Resources

- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk)

## License

MIT
