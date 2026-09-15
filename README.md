# Agentdock documentation

The documentation website for Agentdock.

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

Documentation pages live in `content/docs` as MDX files.

## Machine-readable documentation

The site publishes a concise documentation map at [`/llms.txt`](https://agentdock-ai.vercel.app/llms.txt) and the complete reference at [`/llms-full.txt`](https://agentdock-ai.vercel.app/llms-full.txt). Singular aliases are also available at [`/llm.txt`](https://agentdock-ai.vercel.app/llm.txt) and [`/llm-full.txt`](https://agentdock-ai.vercel.app/llm-full.txt).
