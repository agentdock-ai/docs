import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { docsTree } from "@/lib/docs-tree";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={docsTree(source.getPageTree())}
      {...baseOptions()}
      sidebar={{ defaultOpenLevel: 1, className: "ad-docs-sidebar" }}
    >
      {children}
    </DocsLayout>
  );
}
