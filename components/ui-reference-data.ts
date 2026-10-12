export type UIReferenceMeta = {
  group: string;
  name: string;
  slug: string;
  file: string;
  description: string;
};

export function uiReferenceGroupSlug(group: string) {
  return `component-group-${group.toLowerCase().replaceAll(" ", "-")}`;
}

export const uiReferenceEntries: UIReferenceMeta[] = [
  {
    group: "Conversation",
    name: "Message · User",
    slug: "message-user",
    file: "message.tsx",
    description: "A user-authored message bubble.",
  },
  {
    group: "Conversation",
    name: "Message · Assistant",
    slug: "message-assistant",
    file: "message.tsx",
    description: "An assistant response with optional reasoning and actions.",
  },
  {
    group: "Conversation",
    name: "MessageContent",
    slug: "message-content",
    file: "message-content.tsx",
    description: "The content container shared by message variants.",
  },
  {
    group: "Conversation",
    name: "MarkdownContent",
    slug: "markdown-content",
    file: "markdown-content.tsx",
    description: "Renders assistant text as formatted Markdown.",
  },
  {
    group: "Conversation",
    name: "MessageList",
    slug: "message-list",
    file: "message-list.tsx",
    description: "Lays out conversation messages and activity in order.",
  },
  {
    group: "Composer",
    name: "Composer",
    slug: "composer",
    file: "composer.tsx",
    description: "The primary input area for sending a conversation message.",
  },
  {
    group: "Composer",
    name: "ComposerAttachments",
    slug: "composer-attachments",
    file: "composer-attachments.tsx",
    description: "Displays files attached to the composer.",
  },
  {
    group: "Composer",
    name: "ComposerAttachmentPicker",
    slug: "composer-attachment-picker",
    file: "composer-attachment-picker.tsx",
    description: "Opens the file picker for new attachments.",
  },
  {
    group: "Activity",
    name: "StreamingText",
    slug: "streaming-text",
    file: "streaming-text.tsx",
    description: "Presents text while a response is still streaming.",
  },
  {
    group: "Activity",
    name: "ThinkingIndicator",
    slug: "thinking-indicator",
    file: "thinking-indicator.tsx",
    description: "Communicates that the assistant is working.",
  },
  {
    group: "Activity",
    name: "Reasoning",
    slug: "reasoning",
    file: "reasoning.tsx",
    description: "Shows expandable model reasoning content.",
  },
  {
    group: "Activity",
    name: "ToolMessage",
    slug: "tool-message",
    file: "tool-message.tsx",
    description: "Displays a tool result as a conversation item.",
  },
  {
    group: "Activity",
    name: "ToolCall",
    slug: "tool-call",
    file: "tool-call.tsx",
    description: "Shows one tool call and its current status.",
  },
  {
    group: "Activity",
    name: "ToolTimeline",
    slug: "tool-timeline",
    file: "tool-timeline.tsx",
    description: "Groups tool activity into a compact timeline.",
  },
  {
    group: "Activity",
    name: "ApprovalCard",
    slug: "approval-card",
    file: "approval-card.tsx",
    description: "Requests and presents a user approval decision.",
  },
  {
    group: "Activity",
    name: "ErrorState",
    slug: "error-state",
    file: "error-state.tsx",
    description: "Explains a recoverable conversation or connection error.",
  },
  {
    group: "Layout",
    name: "ChatShell",
    slug: "chat-shell",
    file: "chat-shell.tsx",
    description: "Provides the full chat surface and composer layout.",
  },
  {
    group: "Layout",
    name: "ChatViewport",
    slug: "chat-viewport",
    file: "chat-viewport.tsx",
    description: "Owns the scrollable conversation viewport.",
  },
  {
    group: "Layout",
    name: "ThreadSidebar",
    slug: "thread-sidebar",
    file: "thread-sidebar.tsx",
    description: "Lists threads and exposes thread navigation.",
  },
  {
    group: "Layout",
    name: "EmptyState",
    slug: "empty-state",
    file: "empty-state.tsx",
    description: "Introduces a conversation before the first message.",
  },
  {
    group: "Layout",
    name: "Suggestions",
    slug: "suggestions",
    file: "empty-state.tsx",
    description: "Offers ready-to-send prompts for an empty conversation.",
  },
  {
    group: "Controls",
    name: "ChatActionBar",
    slug: "chat-action-bar",
    file: "chat-action-bar.tsx",
    description: "Adds compact actions beneath a response.",
  },
  {
    group: "Controls",
    name: "ScrollToLatest",
    slug: "scroll-to-latest",
    file: "scroll-to-latest.tsx",
    description: "Returns the conversation viewport to the latest item.",
  },
  {
    group: "Controls",
    name: "ChatIcon",
    slug: "chat-icon",
    file: "icon.tsx",
    description: "Renders the icon treatment used by chat controls.",
  },
  {
    group: "Controls",
    name: "Button",
    slug: "button",
    file: "ui/button.tsx",
    description: "The shared button primitive used by chat actions.",
  },
  {
    group: "Controls",
    name: "Textarea",
    slug: "textarea",
    file: "ui/textarea.tsx",
    description: "The shared multiline text input primitive.",
  },
  {
    group: "Controls",
    name: "Collapsible",
    slug: "collapsible",
    file: "ui/collapsible.tsx",
    description: "Provides accessible expandable and collapsible content.",
  },
];
