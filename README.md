# AgentDock documentation

The documentation website describes the serving adapter for compiled LangGraph
graphs. Agent construction, model integrations, tools, checkpoint savers, and
application security remain with LangChain, LangGraph, and the host application.

## Run it locally

Use Node.js 22 or later.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build it

```bash
npm run typecheck
npm run build
```

Documentation pages live in `content/docs` as MDX files. Machine-readable
references are published at `/llms.txt` and `/llms-full.txt`.
