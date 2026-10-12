import type { ReactNode } from 'react';

type PreviewKind =
  | 'user-message'
  | 'image-message'
  | 'assistant-message'
  | 'message-list'
  | 'message-content'
  | 'markdown'
  | 'composer'
  | 'attachments'
  | 'picker'
  | 'streaming'
  | 'thinking'
  | 'reasoning'
  | 'tool-message'
  | 'tool-call'
  | 'tool-timeline'
  | 'running-tools'
  | 'approval'
  | 'error'
  | 'workspace'
  | 'shell'
  | 'viewport'
  | 'sidebar'
  | 'empty'
  | 'suggestions'
  | 'action-bar'
  | 'scroll'
  | 'icons'
  | 'buttons'
  | 'textarea'
  | 'collapsible';

type GalleryItem = {
  name: string;
  description: string;
  preview: PreviewKind;
};

const groups: { title: string; items: GalleryItem[] }[] = [
  {
    title: 'Conversation',
    items: [
      {
        name: 'Message · User',
        description: 'A user message with its own alignment and treatment.',
        preview: 'user-message',
      },
      {
        name: 'Message · Image attachment',
        description: 'A message that includes an image and its caption.',
        preview: 'image-message',
      },
      {
        name: 'Message · Assistant',
        description: 'Assistant content with readable text and reasoning.',
        preview: 'assistant-message',
      },
      {
        name: 'MessageList',
        description: 'An ordered transcript of messages and activity.',
        preview: 'message-list',
      },
      {
        name: 'MessageContent',
        description: 'Renders the content blocks that belong to a message.',
        preview: 'message-content',
      },
      {
        name: 'MarkdownContent',
        description:
          'Formats assistant Markdown, including lists and inline code.',
        preview: 'markdown',
      },
    ],
  },
  {
    title: 'Composer',
    items: [
      {
        name: 'Composer',
        description: 'Text entry, attachment affordance, and send action.',
        preview: 'composer',
      },
      {
        name: 'ComposerAttachments',
        description: 'Attachment chips with upload, retry, and remove states.',
        preview: 'attachments',
      },
      {
        name: 'ComposerAttachmentPicker',
        description: 'A compact control for choosing files to attach.',
        preview: 'picker',
      },
    ],
  },
  {
    title: 'Activity',
    items: [
      {
        name: 'StreamingText',
        description: 'Assistant text while a response is arriving.',
        preview: 'streaming',
      },
      {
        name: 'ThinkingIndicator',
        description: 'A small indicator for active assistant work.',
        preview: 'thinking',
      },
      {
        name: 'Reasoning',
        description: 'A collapsible view of reasoning content when enabled.',
        preview: 'reasoning',
      },
      {
        name: 'ToolMessage',
        description: 'A tool result displayed in the transcript.',
        preview: 'tool-message',
      },
      {
        name: 'ToolCall',
        description: 'One tool call with its status and summary.',
        preview: 'tool-call',
      },
      {
        name: 'ToolTimeline',
        description: 'A grouped list of tool calls from a run.',
        preview: 'tool-timeline',
      },
      {
        name: 'ToolTimeline · Running',
        description: 'The same timeline while a tool is still running.',
        preview: 'running-tools',
      },
      {
        name: 'ApprovalCard',
        description: 'A pending human decision with available actions.',
        preview: 'approval',
      },
      {
        name: 'ErrorState',
        description: 'A scoped error message with a clear next step.',
        preview: 'error',
      },
    ],
  },
  {
    title: 'Layout',
    items: [
      {
        name: 'ChatWorkspace',
        description: 'A workspace frame for a conversation and its sidebar.',
        preview: 'workspace',
      },
      {
        name: 'ChatShell',
        description: 'A flexible frame that anchors content and a composer.',
        preview: 'shell',
      },
      {
        name: 'ChatViewport',
        description:
          'A scrollable conversation area with room for latest-message navigation.',
        preview: 'viewport',
      },
      {
        name: 'ThreadSidebar',
        description: 'A selectable list of conversations.',
        preview: 'sidebar',
      },
      {
        name: 'EmptyState',
        description:
          'An inviting start for a conversation with no messages yet.',
        preview: 'empty',
      },
      {
        name: 'Suggestions',
        description: 'Prompt suggestions that can start a conversation.',
        preview: 'suggestions',
      },
    ],
  },
  {
    title: 'Controls',
    items: [
      {
        name: 'ChatActionBar',
        description: 'Small actions associated with an assistant response.',
        preview: 'action-bar',
      },
      {
        name: 'ScrollToLatest',
        description: 'A floating control that returns to the newest message.',
        preview: 'scroll',
      },
      {
        name: 'ChatIcon',
        description: 'Consistent icon sizing for chat controls.',
        preview: 'icons',
      },
      {
        name: 'Button',
        description: 'Primary, outline, quiet, and disabled button variants.',
        preview: 'buttons',
      },
      {
        name: 'Textarea',
        description: 'A themed multi-line input for the composer.',
        preview: 'textarea',
      },
      {
        name: 'Collapsible',
        description: 'A disclosure control for optional details.',
        preview: 'collapsible',
      },
    ],
  },
];

function Preview({ kind }: { kind: PreviewKind }) {
  const block = (children: ReactNode, className = '') => (
    <div className={`ad-ui-demo-block ${className}`}>{children}</div>
  );

  switch (kind) {
    case 'user-message':
      return block('Could you help me shape this idea?', 'ad-ui-demo-user');
    case 'image-message':
      return block(
        <>
          <span className="ad-ui-demo-image" />
          <span>What do you think of this image?</span>
        </>,
        'ad-ui-demo-row',
      );
    case 'assistant-message':
      return block(
        <>
          A clear answer, formatted for easy reading.
          <span className="ad-ui-demo-muted">Reasoning · collapsed</span>
        </>,
      );
    case 'message-list':
      return (
        <div className="ad-ui-demo-stack">
          <span className="ad-ui-demo-block ad-ui-demo-user">
            Hi, can you help?
          </span>
          <span className="ad-ui-demo-block">
            Of course. What are you working on?
          </span>
        </div>
      );
    case 'message-content':
      return block(
        <>
          <strong>Useful answer</strong>
          <span className="ad-ui-demo-muted">
            Text, images, and activity in order
          </span>
        </>,
      );
    case 'markdown':
      return block(
        <>
          A short heading
          <span className="ad-ui-demo-rule" />
          <span>• &nbsp;Formatted list item</span>
          <code>inline code</code>
        </>,
      );
    case 'composer':
      return (
        <div className="ad-ui-demo-composer">
          <span>Write a message…</span>
          <span className="ad-ui-demo-actions">
            <i>＋</i>
            <i>↑</i>
          </span>
        </div>
      );
    case 'attachments':
      return (
        <div className="ad-ui-demo-chips">
          <span>
            brief.pdf <b>×</b>
          </span>
          <span>
            image.png <b>↻</b>
          </span>
        </div>
      );
    case 'picker':
      return block(
        <span className="ad-ui-demo-button">＋ &nbsp; Attach a file</span>,
      );
    case 'streaming':
      return block(
        <>
          The response appears as it arrives
          <span className="ad-ui-demo-caret" />
        </>,
      );
    case 'thinking':
      return block(
        <>
          <span className="ad-ui-demo-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="ad-ui-demo-muted">Thinking</span>
        </>,
        'ad-ui-demo-row',
      );
    case 'reasoning':
      return block(
        <>
          ⌄ &nbsp; Reasoning
          <span className="ad-ui-demo-muted">
            I’ll compare the options, then summarize.
          </span>
        </>,
      );
    case 'tool-message':
      return block(
        <>
          Tool result
          <span className="ad-ui-demo-code">Found 3 matching files</span>
        </>,
      );
    case 'tool-call':
      return block(
        <>
          ⌁ &nbsp; read_file
          <span className="ad-ui-demo-muted">Completed · README.md</span>
        </>,
      );
    case 'tool-timeline':
      return (
        <div className="ad-ui-demo-stack">
          <span className="ad-ui-demo-tool">
            ⌁ &nbsp; list_files <b>Done</b>
          </span>
          <span className="ad-ui-demo-tool">
            ⌁ &nbsp; read_file <b>Done</b>
          </span>
        </div>
      );
    case 'running-tools':
      return (
        <div className="ad-ui-demo-stack">
          <span className="ad-ui-demo-tool">
            ⌁ &nbsp; list_files <b>Done</b>
          </span>
          <span className="ad-ui-demo-tool">
            ◌ &nbsp; run_script <b className="ad-ui-demo-accent">Running</b>
          </span>
        </div>
      );
    case 'approval':
      return block(
        <>
          Allow this action?
          <span className="ad-ui-demo-muted">
            The agent wants to update a file.
          </span>
          <span className="ad-ui-demo-actions">
            <i>Reject</i>
            <i className="ad-ui-demo-solid">Approve</i>
          </span>
        </>,
      );
    case 'error':
      return block(
        <>
          Connection interrupted
          <span className="ad-ui-demo-muted">
            Your response is preserved. Try again.
          </span>
        </>,
        'ad-ui-demo-error',
      );
    case 'workspace':
      return (
        <div className="ad-ui-demo-workspace">
          <aside />
          <div>
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    case 'shell':
      return (
        <div className="ad-ui-demo-shell">
          <div />
          <span />
        </div>
      );
    case 'viewport':
      return (
        <div className="ad-ui-demo-viewport">
          <span />
          <span />
          <span />
          <b>↓</b>
        </div>
      );
    case 'sidebar':
      return (
        <div className="ad-ui-demo-sidebar">
          <span className="ad-ui-demo-selected">Project planning</span>
          <span>Review the API</span>
          <span>Weekly notes</span>
        </div>
      );
    case 'empty':
      return block(
        <>
          How can I help?
          <span className="ad-ui-demo-muted">
            Ask a question or choose a prompt.
          </span>
        </>,
      );
    case 'suggestions':
      return (
        <div className="ad-ui-demo-chips">
          <span>Plan my week</span>
          <span>Explain a concept</span>
        </div>
      );
    case 'action-bar':
      return (
        <div className="ad-ui-demo-toolbar">
          <span>□ &nbsp; Copy</span>
          <span>↻ &nbsp; Retry</span>
          <span>♡ &nbsp; Like</span>
        </div>
      );
    case 'scroll':
      return <div className="ad-ui-demo-scroll">↓</div>;
    case 'icons':
      return (
        <div className="ad-ui-demo-icons">
          <span>＋</span>
          <span>⌕</span>
          <span>⌁</span>
          <span>↑</span>
        </div>
      );
    case 'buttons':
      return (
        <div className="ad-ui-demo-chips">
          <span className="ad-ui-demo-solid">Continue</span>
          <span>Cancel</span>
        </div>
      );
    case 'textarea':
      return block('Write a message…', 'ad-ui-demo-input');
    case 'collapsible':
      return block(
        <>
          ⌄ &nbsp; Show details
          <span className="ad-ui-demo-muted">
            Additional context appears when opened.
          </span>
        </>,
      );
  }
}

export function UIComponentGallery() {
  return (
    <div className="ad-ui-gallery">
      {groups.map((group) => (
        <section className="ad-ui-gallery-group" key={group.title}>
          <h3>{group.title}</h3>
          <div className="ad-ui-gallery-grid">
            {group.items.map((item) => (
              <article className="ad-ui-gallery-card" key={item.name}>
                <div className="ad-ui-gallery-preview">
                  <Preview kind={item.preview} />
                </div>
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
