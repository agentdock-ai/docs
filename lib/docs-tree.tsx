import type { Folder, Item, Root } from "fumadocs-core/page-tree";
import { BookOpen, PanelsTopLeft, Workflow } from "lucide-react";

/** Group existing pages without changing URLs, source references, or article titles. */
export function docsTree(tree: Root): Root {
  const remaining = new Set(tree.children);
  function pages(slugs: string[]): Item[] {
    return slugs.flatMap((slug) => {
      const node = tree.children.find(
        (item): item is Item =>
          item.type === "page" && item.url === `/docs${slug ? `/${slug}` : ""}`,
      );
      if (!node) return [];
      remaining.delete(node);
      return [{ ...node, name: slug === "" ? "Overview" : node.name }];
    });
  }
  const overview = pages([""]);
  const groups: Folder[] = [
    {
      type: "folder",
      name: "Getting started",
      icon: <BookOpen />,
      children: pages(["installation", "quickstart"]),
    },
    {
      type: "folder",
      name: "Core concepts",
      icon: <Workflow />,
      children: pages(["events", "approvals", "example"]),
    },
    {
      type: "folder",
      name: "UI & reference",
      icon: <PanelsTopLeft />,
      children: pages(["ui", "api-reference"]),
    },
  ];
  return {
    ...tree,
    children: [
      ...overview,
      ...groups.filter((group) => group.children.length),
      ...remaining,
    ],
  };
}
