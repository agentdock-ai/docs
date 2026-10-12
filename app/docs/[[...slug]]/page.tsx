import { source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { UIReferenceSidebar } from "@/components/ui-reference-sidebar";
import { uiReferenceEntries } from "@/components/ui-reference-data";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const isUIReference = params.slug?.length === 1 && params.slug[0] === "ui";
  const componentTree = isUIReference ? (
    <UIReferenceSidebar entries={uiReferenceEntries} />
  ) : undefined;

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{ style: "clerk", footer: componentTree }}
      tableOfContentPopover={{ footer: componentTree }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const canonicalPath = params.slug?.length
    ? `/docs/${params.slug.join("/")}`
    : "/docs";

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      title: page.data.title,
      description: page.data.description,
      url: canonicalPath,
    },
    twitter: {
      card: "summary",
      title: page.data.title,
      description: page.data.description,
    },
  };
}
