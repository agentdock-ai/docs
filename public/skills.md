# Agentdock implementation guide for AI coding agents

Use this guide to add Agentdock to an application from scratch. Agentdock is a
TypeScript serving adapter for compiled LangGraph graphs. LangChain and
LangGraph build and execute the agent; Agentdock maps graph activity to a
canonical event stream and serves that stream. The host application owns its
routes, authentication, authorization, conversation identity, provider setup,
and persistence lifecycle.

## Documentation and reference URLs

- Documentation home: <https://agentdock-ai.vercel.app/>
- Install and compatibility: <https://agentdock-ai.vercel.app/docs/installation>
- Quickstart: <https://agentdock-ai.vercel.app/docs/quickstart>
- Interrupts and approvals: <https://agentdock-ai.vercel.app/docs/approvals>
- Event contract: <https://agentdock-ai.vercel.app/docs/events>
- API reference: <https://agentdock-ai.vercel.app/docs/api-reference>
- Complete HTTP example: <https://agentdock-ai.vercel.app/docs/example>
- React UI: <https://agentdock-ai.vercel.app/docs/ui>
- Migration guidance: <https://agentdock-ai.vercel.app/docs/migration>
- Short machine-readable index: <https://agentdock-ai.vercel.app/llms.txt>
- Full machine-readable guide: <https://agentdock-ai.vercel.app/llms-full.txt>
- This agent guide: <https://agentdock-ai.vercel.app/skills.md>
- Core source and issues: <https://github.com/agentdock-ai/agentdock>
- UI source and installer: <https://github.com/agentdock-ai/agentdock-ui>

When implementing a feature, read the relevant page above and the README for
the package being used. Verify package APIs against the installed version. Do
not invent endpoints, request envelopes, conversation storage, or UI props;
those are application-owned unless a package explicitly documents them.

## Choose the packages

- `@agentdock-ai/agentdock`: serve a compiled LangGraph graph as Agentdock
  events over Node responses, Web Responses, or a transport-free async stream.
- `@agentdock-ai/contracts`: shared event types, validation, and reducer.
- `@agentdock-ai/conversations` (optional): durable conversation records and
  reusable conversation HTTP integration on a configured LangGraph Store.
- `@agentdock-ai/ui-core` (optional): framework-independent client state,
  event decoding, and transcript projection.
- `@agentdock-ai/react` (optional): React store, hooks, adapter types, and
  stream helpers.
- `@agentdock-ai/agentdock-ui` (optional): CLI that copies editable Chat source
  into a React application.

Use only the packages needed by the application. Agentdock core does not
require the React UI or conversation persistence package.

## Requirements and installation

Use Node.js 22 or newer. For an OpenRouter example application:

```sh
npm install @agentdock-ai/agentdock @agentdock-ai/contracts \
  @langchain/core @langchain/langgraph langchain @langchain/openrouter zod
```

Choose a LangChain model integration and a LangGraph checkpointer appropriate
for the application. LangGraph 1.4.17 or newer is required for Agentdock's
native lifecycle callback mapping. Keep provider credentials on the server.

To install the optional editable React Chat UI, run this from the React app:

```sh
npx @agentdock-ai/agentdock-ui add chat
```

The installer detects npm, pnpm, Yarn, or Bun, checks dependencies and copies
editable component source into `components/agentdock-ui`. It installs missing
dependencies with the detected package manager. The host needs React 18+,
TypeScript, Tailwind CSS 4, a resolvable TypeScript alias, and shadcn semantic
theme tokens. `components.json` selects Radix or Base UI; the installer can
create it when missing. Use `--dry-run` to preview or `--cwd ./apps/web` to
target a workspace app. For a custom React interface without the copied Chat
components, install `@agentdock-ai/react` and `react` directly.

## Build and serve an agent

Build the graph with LangChain or LangGraph, then give the compiled graph to
Agentdock. This minimal example uses an in-memory saver for development:

```ts
import { ChatOpenRouter } from "@langchain/openrouter";
import { MemorySaver } from "@langchain/langgraph";
import { Agentdock } from "@agentdock-ai/agentdock";
import { createAgent } from "langchain";

const graph = createAgent({
  model: new ChatOpenRouter({
    model: process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini",
    apiKey: process.env.OPENROUTER_API_KEY,
  }),
  tools: [],
  checkpointer: new MemorySaver(),
}).graph;

const runtime = new Agentdock(graph);
```

After parsing the request and authenticating and authorizing the user, pass a
server-derived thread ID and graph input to the runtime:

```ts
await runtime.pipe(response, {
  threadId: authorizedThreadId,
  input: { messages: [{ role: "user", content: prompt }] },
});
```

Choose the serving method that fits the framework:

- `runtime.pipe(nodeResponse, run)` writes SSE to a Node-compatible response,
  handles backpressure, and cancels graph work when the client disconnects.
- `await runtime.toResponse(run)` returns a Web `Response` with a stream.
- `runtime.stream(run)` yields canonical events without choosing a transport.

Agentdock does not create routes or prescribe URL paths, JSON request bodies,
or authentication. Complete request parsing, authorization, and status selection
before starting a response stream. See the HTTP example for a complete server.

## Interrupts and approvals

LangGraph checkpoints hold pending work. For LangChain
`humanInTheLoopMiddleware` approvals, use `Agentdock.HITL`; generic native
interrupts remain opaque by default with `Agentdock.OPAQUE`:

```ts
import { Agentdock, validateToolApprovalResume } from "@agentdock-ai/agentdock";

const runtime = new Agentdock(graph, {
  interruptFormat: Agentdock.HITL,
  validateResume: validateToolApprovalResume,
});
```

`validateToolApprovalResume` checks the LangChain HITL response envelope and
action count. It does not authorize users or enforce application policy. The
application must authorize every continuation. Resume with the same authorized
thread ID and the value expected by the graph:

```ts
await runtime.pipe(response, {
  threadId: authorizedThreadId,
  resume: { decisions: [{ type: "approve" }] },
});
```

Use native interrupt IDs when resuming multiple pending interrupts. Continue a
static breakpoint with `{ threadId, continue: true }`. Use a LangGraph
checkpointer when work must survive across requests or process restarts.

## Client and UI integration

The browser consumes canonical Agentdock contract events. Normalize
provider-specific and LangGraph values on the server. A React `Chat` receives a
stable, application-owned `ChatAdapter`; it does not have an endpoint prop and
does not create an API route. The adapter owns request construction and yields
events decoded by `@agentdock-ai/react`.

The application owns conversation history, attachment storage and URLs,
authorization, and persistence. Hydrate normalized history separately from a
live run. Use the optional `@agentdock-ai/conversations` package when its
documented storage and HTTP integration fits the application; otherwise keep
those responsibilities in the host.

## Production and security rules

- Derive `threadId` from authenticated server state. Treat it as a security
  boundary; never trust a client-provided ID without authorization.
- Authorize checkpoint reads, resumes, approvals, and conversation operations.
- Keep model/API credentials and tool side effects on the server.
- Create and close checkpointer and Store resources in the application.
- Use a durable saver for production persistence. `MemorySaver` is for
  development and single-process examples.
- Serialize overlapping runs for a thread if the graph or saver requires it.
- Do not add Agentdock event bookkeeping to graph state. Agentdock reads native
  pending tasks and does not call `updateState()` to persist serving metadata.
- A cancellation signal reaches LangGraph and cooperative tools; a tool that
  ignores its signal may continue after a client disconnects.

## Suggested implementation workflow

1. Inspect the existing app structure, graph, route framework, auth, and saver.
2. Read Installation and Quickstart, then the relevant API or UI guide.
3. Install only the required packages and implement the graph with LangChain or
   LangGraph.
4. Add a route that authenticates and authorizes first, derives the trusted
   thread ID, and then calls the appropriate Agentdock serving method.
5. If adding the React UI, run its CLI and provide an application-owned adapter.
6. Handle canonical events and interruption/resume according to the event and
   approval guides.
7. Typecheck and run the application's relevant tests; report precisely what
   was verified.
