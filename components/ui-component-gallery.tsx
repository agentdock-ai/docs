type GalleryItem = {
  name: string;
  description: string;
  image: string;
};

const groups: { title: string; items: GalleryItem[] }[] = [
  {
    title: 'Conversation',
    items: [
      {
        name: 'Message · User',
        description: 'A user message with its own alignment and treatment.',
        image: 'message-user',
      },
      {
        name: 'Message · Image attachment',
        description: 'A message that includes an image and its caption.',
        image: 'message-image-attachment',
      },
      {
        name: 'Message · Assistant',
        description: 'Assistant content with readable text and reasoning.',
        image: 'message-assistant',
      },
      {
        name: 'MessageList',
        description: 'An ordered transcript of messages and activity.',
        image: 'message-list',
      },
      {
        name: 'MessageContent',
        description: 'Renders the content blocks that belong to a message.',
        image: 'message-content',
      },
      {
        name: 'MarkdownContent',
        description:
          'Formats assistant Markdown, including lists and inline code.',
        image: 'markdown-content',
      },
    ],
  },
  {
    title: 'Composer',
    items: [
      {
        name: 'Composer',
        description: 'Text entry, attachment affordance, and send action.',
        image: 'composer',
      },
      {
        name: 'ComposerAttachments',
        description: 'Attachment chips with upload, retry, and remove states.',
        image: 'composer-attachments',
      },
      {
        name: 'ComposerAttachmentPicker',
        description: 'A compact control for choosing files to attach.',
        image: 'composer-attachment-picker',
      },
    ],
  },
  {
    title: 'Activity',
    items: [
      {
        name: 'StreamingText',
        description: 'Assistant text while a response is arriving.',
        image: 'streaming-text',
      },
      {
        name: 'ThinkingIndicator',
        description: 'A small indicator for active assistant work.',
        image: 'thinking-indicator',
      },
      {
        name: 'Reasoning',
        description: 'A collapsible view of reasoning content when enabled.',
        image: 'reasoning',
      },
      {
        name: 'ToolMessage',
        description: 'A tool result displayed in the transcript.',
        image: 'tool-message',
      },
      {
        name: 'ToolCall',
        description: 'One tool call with its status and summary.',
        image: 'tool-call',
      },
      {
        name: 'ToolTimeline',
        description: 'A grouped list of tool calls from a run.',
        image: 'tool-timeline',
      },
      {
        name: 'ToolTimeline · Running',
        description: 'The same timeline while a tool is still running.',
        image: 'tool-timeline-running',
      },
      {
        name: 'ApprovalCard',
        description: 'A pending human decision with available actions.',
        image: 'approval-card',
      },
      {
        name: 'ErrorState',
        description: 'A scoped error message with a clear next step.',
        image: 'error-state',
      },
    ],
  },
  {
    title: 'Layout',
    items: [
      {
        name: 'ChatWorkspace',
        description: 'A workspace frame for a conversation and its sidebar.',
        image: 'chat-workspace',
      },
      {
        name: 'ChatShell',
        description: 'A flexible frame that anchors content and a composer.',
        image: 'chat-shell',
      },
      {
        name: 'ChatViewport',
        description:
          'A scrollable conversation area with latest-message navigation.',
        image: 'chat-viewport',
      },
      {
        name: 'ThreadSidebar',
        description: 'A selectable list of conversations.',
        image: 'thread-sidebar',
      },
      {
        name: 'EmptyState',
        description:
          'An inviting start for a conversation with no messages yet.',
        image: 'empty-state',
      },
      {
        name: 'Suggestions',
        description: 'Prompt suggestions that can start a conversation.',
        image: 'suggestions',
      },
    ],
  },
  {
    title: 'Controls',
    items: [
      {
        name: 'ChatActionBar',
        description: 'Small actions associated with an assistant response.',
        image: 'chat-action-bar',
      },
      {
        name: 'ScrollToLatest',
        description: 'A floating control that returns to the newest message.',
        image: 'scroll-to-latest',
      },
      {
        name: 'ChatIcon',
        description: 'Consistent icon sizing for chat controls.',
        image: 'chat-icon',
      },
      {
        name: 'Button',
        description: 'Primary, outline, quiet, and disabled button variants.',
        image: 'button',
      },
      {
        name: 'Textarea',
        description: 'A themed multi-line input for the composer.',
        image: 'textarea',
      },
      {
        name: 'Collapsible',
        description: 'A disclosure control for optional details.',
        image: 'collapsible',
      },
    ],
  },
];

export function UIComponentGallery() {
  return (
    <div className="ad-ui-gallery">
      {groups.map((group) => (
        <section className="ad-ui-gallery-group" key={group.title}>
          <h3>{group.title}</h3>
          <div className="ad-ui-gallery-grid">
            {group.items.map((item) => (
              <article className="ad-ui-gallery-card" key={item.name}>
                <figure className="ad-ui-gallery-preview">
                  <img
                    className="ad-ui-preview-light"
                    src={`/ui-components/${item.image}.png`}
                    alt={`${item.name} as rendered in the Agentdock UI playground`}
                  />
                  <img
                    className="ad-ui-preview-dark"
                    src={`/ui-components/${item.image}-dark.png`}
                    alt=""
                    aria-hidden="true"
                  />
                </figure>
                <div className="ad-ui-gallery-copy">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
