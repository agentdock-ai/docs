"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowUp,
  ChevronRight,
  Copy,
  Image,
  Paperclip,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type {
  RenderMessageItem,
  RenderModel,
  RenderToolCallItem,
  RenderApproval,
} from "@agentdock-ai/ui-core";
import { ApprovalCard } from "./agentdock-ui/approval-card";
import { ChatActionBar } from "./agentdock-ui/chat-action-bar";
import { ChatShell } from "./agentdock-ui/chat-shell";
import { ChatViewport } from "./agentdock-ui/chat-viewport";
import { Composer } from "./agentdock-ui/composer";
import { ComposerAttachments } from "./agentdock-ui/composer-attachments";
import { ComposerAttachmentPicker } from "./agentdock-ui/composer-attachment-picker";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { EmptyState, Suggestions } from "./agentdock-ui/empty-state";
import { ErrorState } from "./agentdock-ui/error-state";
import { ChatIcon } from "./agentdock-ui/icon";
import { MarkdownContent } from "./agentdock-ui/markdown-content";
import { Message } from "./agentdock-ui/message";
import { MessageContent } from "./agentdock-ui/message-content";
import { MessageList } from "./agentdock-ui/message-list";
import { Reasoning } from "./agentdock-ui/reasoning";
import { ScrollToLatest } from "./agentdock-ui/scroll-to-latest";
import { StreamingText } from "./agentdock-ui/streaming-text";
import { ThinkingIndicator } from "./agentdock-ui/thinking-indicator";
import { ThreadSidebar } from "./agentdock-ui/thread-sidebar";
import { ToolCall } from "./agentdock-ui/tool-call";
import { ToolMessage } from "./agentdock-ui/tool-message";
import { ToolTimeline } from "./agentdock-ui/tool-timeline";
import type { AttachmentDraft } from "./agentdock-ui/use-chat-attachments";
import type { UIReferenceMeta } from "./ui-reference-data";

export type UIReferenceEntry = UIReferenceMeta & { source: string };

const textBlock = (id: string, text: string) => ({
  id,
  position: 0,
  state: "complete" as const,
  type: "text" as const,
  text,
});
const userMessage = {
  id: "user-1",
  messageId: "user-1",
  runId: "run-1",
  phaseId: null,
  position: 0,
  type: "message" as const,
  role: "user" as const,
  state: "complete" as const,
  blocks: [textBlock("user-block", "Help me design a simple chat interface.")],
} satisfies RenderMessageItem;
const assistantMessage = {
  id: "assistant-1",
  messageId: "assistant-1",
  runId: "run-1",
  phaseId: null,
  position: 1,
  type: "message" as const,
  role: "assistant" as const,
  state: "complete" as const,
  blocks: [
    textBlock(
      "assistant-block",
      "Keep the conversation readable, keep activity compact, and make the next action clear.",
    ),
  ],
} satisfies RenderMessageItem;
const toolMessage = {
  id: "tool-message-1",
  messageId: "tool-message-1",
  runId: null,
  phaseId: null,
  position: 0,
  type: "message" as const,
  role: "tool" as const,
  state: "complete" as const,
  blocks: [textBlock("tool-message-block", "The file was read successfully.")],
} satisfies RenderMessageItem;
const tool = {
  id: "tool-1",
  runId: "run-1",
  phaseId: null,
  position: 2,
  type: "tool-call" as const,
  active: false,
  tool: {
    toolCallId: "tool-1",
    name: "read_file",
    input: { path: "README.md" },
    progress: [],
    output: "File contents",
    status: "complete" as const,
  },
} satisfies RenderToolCallItem;
const approval: RenderApproval = {
  interruptId: "approval-1",
  kind: "tool-approval",
  title: "Allow file access?",
  detail: "The assistant wants to read README.md.",
  actions: [{ id: "allow", label: "Allow", input: { approved: true } }],
  state: "pending",
  decisions: [],
};
const renderModel = {
  turns: [
    {
      id: "turn-1",
      runId: "run-1",
      sessionId: null,
      state: "completed",
      items: [
        userMessage,
        assistantMessage,
        { ...tool, type: "tool-call" as const },
        {
          id: "approval-item",
          runId: "run-1",
          phaseId: null,
          position: 3,
          type: "approval" as const,
          approval,
        },
      ],
      usage: null,
      limit: null,
      finishReason: "stop",
      cancellationReason: null,
    },
  ],
  streamStatus: "closed",
} as unknown as RenderModel;
const threads = [
  { id: "design", title: "A simple chat interface", isRunning: true },
  { id: "week", title: "Plan my week" },
  { id: "idea", title: "Review an idea" },
];
const attachmentItems: AttachmentDraft[] = [
  {
    id: "notes",
    file: new File(["Project notes"], "notes.md", { type: "text/markdown" }),
    status: "ready",
  },
  {
    id: "outline",
    file: new File(["Draft outline"], "outline.txt", { type: "text/plain" }),
    status: "uploading",
  },
  {
    id: "brief",
    file: new File(["Project brief"], "brief.pdf", { type: "application/pdf" }),
    status: "error",
    error: "Upload failed",
  },
];

function Preview({ children }: { children: ReactNode }) {
  return <div className="ad-live-preview">{children}</div>;
}

function ComponentPreview({ slug }: { slug: string }) {
  const [draft, setDraft] = useState("Tell me more about this idea.");
  const [selected, setSelected] = useState("design");
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const send = () => setDraft("");
  switch (slug) {
    case "message-user":
      return (
        <Preview>
          <Message message={userMessage} showReasoning={false} />
        </Preview>
      );
    case "message-assistant":
      return (
        <Preview>
          <Message message={assistantMessage} showReasoning />
        </Preview>
      );
    case "message-content":
      return (
        <Preview>
          <MessageContent blocks={assistantMessage.blocks} showReasoning />
        </Preview>
      );
    case "markdown-content":
      return (
        <Preview>
          <MarkdownContent text="**Readable Markdown**\n\n- Lists\n- Inline `code`" />
        </Preview>
      );
    case "message-list":
      return (
        <Preview>
          <MessageList
            model={renderModel}
            showReasoning
            canRespond={false}
            respondingTo={null}
            onRespond={() => {}}
          />
        </Preview>
      );
    case "composer":
      return (
        <Preview>
          <Composer
            value={draft}
            onChange={setDraft}
            onSubmit={send}
            busy={false}
            waiting={false}
            cancelling={false}
          />{" "}
        </Preview>
      );
    case "composer-attachments":
      return (
        <Preview>
          <ComposerAttachments
            items={attachmentItems}
            onRemove={() => {}}
            onRetry={() => {}}
          />
        </Preview>
      );
    case "composer-attachment-picker":
      return (
        <Preview>
          <ComposerAttachmentPicker onFiles={() => {}} />
        </Preview>
      );
    case "streaming-text":
      return (
        <Preview>
          <StreamingText
            text="I’m putting together a compact, readable interface…"
            active
          />
        </Preview>
      );
    case "thinking-indicator":
      return (
        <Preview>
          <ThinkingIndicator />
        </Preview>
      );
    case "reasoning":
      return (
        <Preview>
          <Reasoning
            text="First, I’ll check the message hierarchy. Then I’ll keep the composer compact."
            active={false}
          />
        </Preview>
      );
    case "tool-message":
      return (
        <Preview>
          <ToolMessage message={toolMessage} />
        </Preview>
      );
    case "tool-call":
      return (
        <Preview>
          <ToolCall item={tool} />
        </Preview>
      );
    case "tool-timeline":
      return (
        <Preview>
          <ToolTimeline
            tools={[
              tool,
              {
                ...tool,
                id: "tool-2",
                tool: {
                  ...tool.tool,
                  toolCallId: "tool-2",
                  name: "list_files",
                },
              },
            ]}
          />
        </Preview>
      );
    case "approval-card":
      return (
        <Preview>
          <ApprovalCard
            approval={approval}
            enabled
            pending={false}
            onRespond={() => {}}
          />
        </Preview>
      );
    case "error-state":
      return (
        <Preview>
          <ErrorState
            title="Connection interrupted"
            detail="Your answer has been preserved. Try again when you’re ready."
          />
        </Preview>
      );
    case "chat-shell":
      return (
        <Preview>
          <ChatShell
            footer={
              <Composer
                value={draft}
                onChange={setDraft}
                onSubmit={send}
                busy={false}
                waiting={false}
                cancelling={false}
              />
            }
          >
            <div className="p-4">
              <Message message={assistantMessage} showReasoning />
            </div>
          </ChatShell>
        </Preview>
      );
    case "chat-viewport":
      return (
        <Preview>
          <ChatViewport revision={renderModel} empty={false}>
            <MessageList
              model={renderModel}
              showReasoning
              canRespond={false}
              respondingTo={null}
              onRespond={() => {}}
            />
          </ChatViewport>
        </Preview>
      );
    case "thread-sidebar":
      return (
        <Preview>
          <ThreadSidebar
            threads={threads}
            selectedId={selected}
            onSelect={setSelected}
            onNew={() => {}}
          />
        </Preview>
      );
    case "empty-state":
      return (
        <Preview>
          <EmptyState
            title="How can I help you today?"
            description="Ask a question or choose a suggestion."
          />
        </Preview>
      );
    case "suggestions":
      return (
        <Preview>
          <Suggestions
            suggestions={["Plan my week", "Explain a concept"]}
            onSubmit={() => {}}
          />
        </Preview>
      );
    case "chat-action-bar":
      return (
        <Preview>
          <ChatActionBar text="A good interface keeps the next step clear." />
        </Preview>
      );
    case "scroll-to-latest":
      return (
        <Preview>
          <div className="relative h-16">
            <ScrollToLatest onClick={() => {}} visible />
          </div>
        </Preview>
      );
    case "chat-icon":
      return (
        <Preview>
          <div className="flex gap-4">
            <ChatIcon icon={ArrowUp} size={18} />
            <ChatIcon icon={Paperclip} size={18} />
            <ChatIcon icon={Image} size={18} />
            <ChatIcon icon={Search} size={18} />
            <ChatIcon icon={Copy} size={18} />
            <ChatIcon icon={ChevronRight} size={18} />
            <ChatIcon icon={Wrench} size={18} />
            <ChatIcon icon={ShieldCheck} size={18} />
          </div>
        </Preview>
      );
    case "button":
      return (
        <Preview>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button>Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Preview>
      );
    case "textarea":
      return (
        <Preview>
          <Textarea
            className="min-h-24"
            defaultValue="A small idea worth exploring."
            aria-label="Sample text area"
          />
        </Preview>
      );
    case "collapsible":
      return (
        <Preview>
          <Collapsible open={showDetails} onOpenChange={setShowDetails}>
            <CollapsibleTrigger asChild>
              <Button variant="outline">Show details</Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="mt-3 text-sm text-muted-foreground">
                Additional context stays available when you need it.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </Preview>
      );
    default:
      return null;
  }
}

export function UIReferenceClient({
  entries,
}: {
  entries: UIReferenceEntry[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [mode, setMode] = useState<Record<string, "preview" | "code">>({});
  const groups = [...new Set(entries.map((entry) => entry.group))];

  async function copy(entry: UIReferenceEntry) {
    await navigator.clipboard.writeText(entry.source);
    setOpen(entry.slug);
  }
  return (
    <div className="ad-ui-reference">
      {groups.map((group) => (
        <section key={group} className="ad-ui-reference-group">
          <h2>{group}</h2>
          <div className="ad-ui-reference-grid">
            {entries
              .filter((entry) => entry.group === group)
              .map((entry) => {
                const current = mode[entry.slug] ?? "preview";
                return (
                  <article
                    className="ad-ui-reference-card"
                    id={entry.slug}
                    key={entry.slug}
                  >
                    <div className="ad-ui-reference-card-heading">
                      <div>
                        <h3>{entry.name}</h3>
                        <p>{entry.description}</p>
                        <code>{entry.file}</code>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setOpen(open === entry.slug ? null : entry.slug)
                        }
                      >
                        {open === entry.slug ? "Hide source" : "View source"}
                      </button>
                    </div>
                    <div className="ad-ui-reference-tabs">
                      <button
                        type="button"
                        aria-selected={current === "preview"}
                        onClick={() =>
                          setMode({ ...mode, [entry.slug]: "preview" })
                        }
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        aria-selected={current === "code"}
                        onClick={() =>
                          setMode({ ...mode, [entry.slug]: "code" })
                        }
                      >
                        Code
                      </button>
                    </div>
                    {current === "preview" ? (
                      <ComponentPreview slug={entry.slug} />
                    ) : (
                      <pre className="ad-ui-source">
                        <code>{entry.source}</code>
                      </pre>
                    )}
                    {open === entry.slug && (
                      <div className="ad-ui-source ad-ui-source-full">
                        <div className="ad-ui-source-actions">
                          <span>Canonical component source</span>
                          <button
                            type="button"
                            onClick={() => void copy(entry)}
                          >
                            Copy source
                          </button>
                        </div>
                        <pre>
                          <code>{entry.source}</code>
                        </pre>
                      </div>
                    )}
                  </article>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
