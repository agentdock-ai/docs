import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  UIReferenceClient,
  type UIReferenceEntry,
} from "./ui-reference-client";

const sourceRoot = join(process.cwd(), "components");

type EntrySpec = [group: string, name: string, slug: string, file: string];
const entries: EntrySpec[] = [
  ["Conversation", "Message · User", "message-user", "message.tsx"],
  ["Conversation", "Message · Assistant", "message-assistant", "message.tsx"],
  ["Conversation", "MessageContent", "message-content", "message-content.tsx"],
  [
    "Conversation",
    "MarkdownContent",
    "markdown-content",
    "markdown-content.tsx",
  ],
  ["Conversation", "MessageList", "message-list", "message-list.tsx"],
  ["Composer", "Composer", "composer", "composer.tsx"],
  [
    "Composer",
    "ComposerAttachments",
    "composer-attachments",
    "composer-attachments.tsx",
  ],
  [
    "Composer",
    "ComposerAttachmentPicker",
    "composer-attachment-picker",
    "composer-attachment-picker.tsx",
  ],
  ["Activity", "StreamingText", "streaming-text", "streaming-text.tsx"],
  [
    "Activity",
    "ThinkingIndicator",
    "thinking-indicator",
    "thinking-indicator.tsx",
  ],
  ["Activity", "Reasoning", "reasoning", "reasoning.tsx"],
  ["Activity", "ToolMessage", "tool-message", "tool-message.tsx"],
  ["Activity", "ToolCall", "tool-call", "tool-call.tsx"],
  ["Activity", "ToolTimeline", "tool-timeline", "tool-timeline.tsx"],
  ["Activity", "ApprovalCard", "approval-card", "approval-card.tsx"],
  ["Activity", "ErrorState", "error-state", "error-state.tsx"],
  ["Layout", "ChatShell", "chat-shell", "chat-shell.tsx"],
  ["Layout", "ChatViewport", "chat-viewport", "chat-viewport.tsx"],
  ["Layout", "ThreadSidebar", "thread-sidebar", "thread-sidebar.tsx"],
  ["Layout", "EmptyState", "empty-state", "empty-state.tsx"],
  ["Layout", "Suggestions", "suggestions", "empty-state.tsx"],
  ["Controls", "ChatActionBar", "chat-action-bar", "chat-action-bar.tsx"],
  ["Controls", "ScrollToLatest", "scroll-to-latest", "scroll-to-latest.tsx"],
  ["Controls", "ChatIcon", "chat-icon", "icon.tsx"],
  ["Controls", "Button", "button", "ui/button.tsx"],
  ["Controls", "Textarea", "textarea", "ui/textarea.tsx"],
  ["Controls", "Collapsible", "collapsible", "ui/collapsible.tsx"],
];

export async function UIReference() {
  const sourceCache = new Map<string, string>();
  const resolved = await Promise.all(
    entries.map(async ([group, name, slug, file]) => {
      let source = sourceCache.get(file);
      if (!source) {
        const sourcePath = file.startsWith("ui/")
          ? join(sourceRoot, file)
          : join(sourceRoot, "agentdock-ui", file);
        source = await readFile(sourcePath, "utf8");
        sourceCache.set(file, source);
      }
      return { group, name, slug, file, source };
    }),
  );

  return <UIReferenceClient entries={resolved} />;
}
