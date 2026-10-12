export type UIComponentEntry = {
  name: string;
  slug: string;
  group: string;
  description: string;
  image: string;
  source: string;
  usage: string;
};

const entry = (
  group: string,
  name: string,
  slug: string,
  description: string,
  source: string,
  usage: string,
): UIComponentEntry => ({
  group,
  name,
  slug,
  description,
  source,
  usage,
  image: slug,
});

const ui =
  "https://github.com/agentdock-ai/agentdock-ui/blob/main/apps/registry/registry/agentdock-ui";
const controls =
  "https://github.com/agentdock-ai/agentdock-ui/blob/main/apps/registry/registry/ui";

export const uiComponents: UIComponentEntry[] = [
  entry(
    "Conversation",
    "Message · User",
    "message-user",
    "A user message with its own alignment and treatment.",
    `${ui}/message.tsx`,
    `import { Message } from "@/components/agentdock-ui/message";\n\n<Message message={userMessage} showReasoning={false} />`,
  ),
  entry(
    "Conversation",
    "Message · Image attachment",
    "message-image-attachment",
    "A message that includes an image and its caption.",
    `${ui}/message.tsx`,
    `import { Message } from "@/components/agentdock-ui/message";\n\n<Message message={messageWithImage} showReasoning={false} />`,
  ),
  entry(
    "Conversation",
    "Message · Assistant",
    "message-assistant",
    "Assistant content with readable text and reasoning.",
    `${ui}/message.tsx`,
    `import { Message } from "@/components/agentdock-ui/message";\n\n<Message message={assistantMessage} showReasoning />`,
  ),
  entry(
    "Conversation",
    "MessageList",
    "message-list",
    "An ordered transcript of messages and activity.",
    `${ui}/message-list.tsx`,
    `import { MessageList } from "@/components/agentdock-ui/message-list";\n\n<MessageList\n  model={renderModel}\n  showReasoning\n  canRespond={false}\n  respondingTo={null}\n  onRespond={handleRespond}\n/>`,
  ),
  entry(
    "Conversation",
    "MessageContent",
    "message-content",
    "Renders the content blocks that belong to a message.",
    `${ui}/message-content.tsx`,
    `import { MessageContent } from "@/components/agentdock-ui/message-content";\n\n<MessageContent blocks={message.blocks} showReasoning={false} />`,
  ),
  entry(
    "Conversation",
    "MarkdownContent",
    "markdown-content",
    "Formats assistant Markdown, including lists and inline code.",
    `${ui}/markdown-content.tsx`,
    `import { MarkdownContent } from "@/components/agentdock-ui/markdown-content";\n\n<MarkdownContent text={answer} />`,
  ),
  entry(
    "Composer",
    "Composer",
    "composer",
    "Text entry, attachment affordance, and send action.",
    `${ui}/composer.tsx`,
    `import { Composer } from "@/components/agentdock-ui/composer";\n\n<Composer\n  value={draft}\n  onChange={setDraft}\n  onSubmit={sendMessage}\n  busy={false}\n  waiting={false}\n  cancelling={false}\n/>`,
  ),
  entry(
    "Composer",
    "ComposerAttachments",
    "composer-attachments",
    "Attachment chips with upload, retry, and remove states.",
    `${ui}/composer-attachments.tsx`,
    `import { ComposerAttachments } from "@/components/agentdock-ui/composer-attachments";\n\n<ComposerAttachments\n  items={attachmentDrafts}\n  onRemove={removeAttachment}\n  onRetry={retryAttachment}\n/>`,
  ),
  entry(
    "Composer",
    "ComposerAttachmentPicker",
    "composer-attachment-picker",
    "A compact control for choosing files to attach.",
    `${ui}/composer-attachment-picker.tsx`,
    `import { ComposerAttachmentPicker } from "@/components/agentdock-ui/composer-attachment-picker";\n\n<ComposerAttachmentPicker onFiles={addFiles} />`,
  ),
  entry(
    "Activity",
    "StreamingText",
    "streaming-text",
    "Assistant text while a response is arriving.",
    `${ui}/streaming-text.tsx`,
    `import { StreamingText } from "@/components/agentdock-ui/streaming-text";\n\n<StreamingText text={text} active={isStreaming} />`,
  ),
  entry(
    "Activity",
    "ThinkingIndicator",
    "thinking-indicator",
    "A small indicator for active assistant work.",
    `${ui}/thinking-indicator.tsx`,
    `import { ThinkingIndicator } from "@/components/agentdock-ui/thinking-indicator";\n\n<ThinkingIndicator />`,
  ),
  entry(
    "Activity",
    "Reasoning",
    "reasoning",
    "A collapsible view of reasoning content when enabled.",
    `${ui}/reasoning.tsx`,
    `import { Reasoning } from "@/components/agentdock-ui/reasoning";\n\n<Reasoning text={reasoningText} active={isStreaming} />`,
  ),
  entry(
    "Activity",
    "ToolMessage",
    "tool-message",
    "A tool result displayed in the transcript.",
    `${ui}/tool-message.tsx`,
    `import { ToolMessage } from "@/components/agentdock-ui/tool-message";\n\n<ToolMessage message={toolMessage} />`,
  ),
  entry(
    "Activity",
    "ToolCall",
    "tool-call",
    "One tool call with its status and summary.",
    `${ui}/tool-call.tsx`,
    `import { ToolCall } from "@/components/agentdock-ui/tool-call";\n\n<ToolCall item={toolCall} />`,
  ),
  entry(
    "Activity",
    "ToolTimeline",
    "tool-timeline",
    "A grouped list of tool calls from a run.",
    `${ui}/tool-timeline.tsx`,
    `import { ToolTimeline } from "@/components/agentdock-ui/tool-timeline";\n\n<ToolTimeline tools={toolCalls} />`,
  ),
  entry(
    "Activity",
    "ToolTimeline · Running",
    "tool-timeline-running",
    "The same timeline while a tool is still running.",
    `${ui}/tool-timeline.tsx`,
    `import { ToolTimeline } from "@/components/agentdock-ui/tool-timeline";\n\n<ToolTimeline tools={runningToolCalls} />`,
  ),
  entry(
    "Activity",
    "ApprovalCard",
    "approval-card",
    "A pending human decision with available actions.",
    `${ui}/approval-card.tsx`,
    `import { ApprovalCard } from "@/components/agentdock-ui/approval-card";\n\n<ApprovalCard\n  approval={approval}\n  enabled={canRespond}\n  pending={isPending}\n  onRespond={respond}\n/>`,
  ),
  entry(
    "Activity",
    "ErrorState",
    "error-state",
    "A scoped error message with a clear next step.",
    `${ui}/error-state.tsx`,
    `import { ErrorState } from "@/components/agentdock-ui/error-state";\n\n<ErrorState title="Connection interrupted" detail={message} />`,
  ),
  entry(
    "Layout",
    "ChatWorkspace",
    "chat-workspace",
    "A workspace frame for a conversation and its sidebar.",
    `${ui}/chat-workspace.tsx`,
    `import { ChatWorkspace } from "@/components/agentdock-ui/chat-workspace";\n\n<ChatWorkspace sidebar={<aside>Threads</aside>}>
  <main>Chat content</main>
</ChatWorkspace>`,
  ),
  entry(
    "Layout",
    "ChatShell",
    "chat-shell",
    "A flexible frame that anchors content and a composer.",
    `${ui}/chat-shell.tsx`,
    `import { ChatShell } from "@/components/agentdock-ui/chat-shell";\n\n<ChatShell footer={<Composer {...composerProps} />}>
  <MessageList {...messageListProps} />
</ChatShell>`,
  ),
  entry(
    "Layout",
    "ChatViewport",
    "chat-viewport",
    "A scrollable conversation area with latest-message navigation.",
    `${ui}/chat-viewport.tsx`,
    `import { ChatViewport } from "@/components/agentdock-ui/chat-viewport";\n\n<ChatViewport revision={renderModel} empty={false}>
  <MessageList {...messageListProps} />
</ChatViewport>`,
  ),
  entry(
    "Layout",
    "ThreadSidebar",
    "thread-sidebar",
    "A selectable list of conversations.",
    `${ui}/thread-sidebar.tsx`,
    `import { ThreadSidebar } from "@/components/agentdock-ui/thread-sidebar";\n\n<ThreadSidebar
  threads={threads}
  selectedId={selectedThreadId}
  onSelect={selectThread}
  onNew={createThread}
/>`,
  ),
  entry(
    "Layout",
    "EmptyState",
    "empty-state",
    "An inviting start for a conversation with no messages yet.",
    `${ui}/empty-state.tsx`,
    `import { EmptyState } from "@/components/agentdock-ui/empty-state";\n\n<EmptyState title="How can I help you today?" />`,
  ),
  entry(
    "Layout",
    "Suggestions",
    "suggestions",
    "Prompt suggestions that can start a conversation.",
    `${ui}/empty-state.tsx`,
    `import { Suggestions } from "@/components/agentdock-ui/empty-state";\n\n<Suggestions suggestions={prompts} onSubmit={sendMessage} />`,
  ),
  entry(
    "Controls",
    "ChatActionBar",
    "chat-action-bar",
    "Small actions associated with an assistant response.",
    `${ui}/chat-action-bar.tsx`,
    `import { ChatActionBar } from "@/components/agentdock-ui/chat-action-bar";\n\n<ChatActionBar text={assistantText} />`,
  ),
  entry(
    "Controls",
    "ScrollToLatest",
    "scroll-to-latest",
    "A floating control that returns to the newest message.",
    `${ui}/scroll-to-latest.tsx`,
    `import { ScrollToLatest } from "@/components/agentdock-ui/scroll-to-latest";\n\n<ScrollToLatest onClick={scrollToLatest} />`,
  ),
  entry(
    "Controls",
    "ChatIcon",
    "chat-icon",
    "Consistent icon sizing for chat controls.",
    `${ui}/icon.tsx`,
    `import { ChatIcon } from "@/components/agentdock-ui/icon";\nimport { ArrowUp } from "lucide-react";\n\n<ChatIcon icon={ArrowUp} size={16} />`,
  ),
  entry(
    "Controls",
    "Button",
    "button",
    "Primary, outline, quiet, and disabled button variants.",
    `${controls}/button.tsx`,
    `import { Button } from "@/components/agentdock-ui/ui/button";\n\n<Button variant="primary">Send</Button>\n<Button variant="outline">Cancel</Button>`,
  ),
  entry(
    "Controls",
    "Textarea",
    "textarea",
    "A themed multi-line input for the composer.",
    `${controls}/textarea.tsx`,
    `import { Textarea } from "@/components/agentdock-ui/ui/textarea";\n\n<Textarea value={draft} onChange={(event) => setDraft(event.target.value)} />`,
  ),
  entry(
    "Controls",
    "Collapsible",
    "collapsible",
    "A disclosure control for optional details.",
    `${controls}/collapsible.tsx`,
    `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/agentdock-ui/ui/collapsible";\n\n<Collapsible>
  <CollapsibleTrigger>Show details</CollapsibleTrigger>
  <CollapsibleContent>Additional context</CollapsibleContent>
</Collapsible>`,
  ),
];

export function getUIComponent(slug: string) {
  return uiComponents.find((component) => component.slug === slug);
}
