# MCP Todo 서버 (TypeScript)

TypeScript와 공식 MCP SDK를 사용하여 구현한 간단한 Todo List MCP (Model Context Protocol) 서버입니다.

## 기술 스택

- **런타임**: Bun
- **언어**: TypeScript
- **MCP SDK**: @modelcontextprotocol/sdk v1.22.0
- **검증**: Zod

## 기능

- **Tools**: `add_todo`, `list_todos`, `complete_todo`

## 사전 요구사항

- [Bun](https://bun.sh/) 런타임
- Node.js (호환성을 위해)

## 설치

```bash
# 의존성 설치
bun install

# 또는 Makefile 사용
make install
```

## 개발

```bash
# 개발 모드로 실행
bun run dev
# 또는
make dev

# 프로덕션 빌드
bun run build
# 또는
make build

# 프로덕션 서버 시작
bun run start
# 또는
make start
```

## 테스트

### MCP Inspector로 테스트 (포트 5173)

```bash
bun run inspector

# 또는 Makefile 사용
make inspector
```

### Claude Desktop과 함께 사용

`~/Library/Application Support/Claude/claude_desktop_config.json`에 추가:

```json
{
  "mcpServers": {
    "todo-typescript": {
      "command": "bun",
      "args": ["run", "src/index.ts"],
      "cwd": "/절대/경로/to/ts-server"
    }
  }
}
```

## 사용 가능한 도구

### 1. add_todo
새로운 할 일 항목을 추가합니다.

**매개변수:**
- `title` (필수): 할 일 제목
- `description` (선택): 할 일 설명

**예시:**
```json
{
  "title": "장보기",
  "description": "우유, 계란, 빵"
}
```

### 2. list_todos
선택적 필터링으로 모든 할 일을 조회합니다.

**매개변수:**
- `completed` (선택): 완료 상태로 필터링 (true/false)

**예시:**
```json
{
  "completed": false
}
```

### 3. complete_todo
할 일을 완료로 표시합니다.

**매개변수:**
- `id` (필수): 완료할 할 일 ID

**예시:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

## 프로젝트 구조

```
src/
├── index.ts              # 메인 서버 및 도구 등록
├── types.ts              # 공유 타입 및 데이터 저장소
└── tools/
    ├── add-todo.ts       # 추가 핸들러
    ├── list-todos.ts     # 목록 핸들러
    └── complete-todo.ts  # 완료 핸들러
```

## 더 알아보기

- 구현 상세: [CLAUDE.md](CLAUDE.md)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Model Context Protocol 문서](https://modelcontextprotocol.io)
- [Bun 문서](https://bun.sh)
