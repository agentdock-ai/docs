import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { UIReference } from "@/components/ui-reference";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    UIReference,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
