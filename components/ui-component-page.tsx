import { notFound } from "next/navigation";
import { getUIComponent } from "@/components/ui-component-catalog";
import { UIComponentDetail } from "@/components/ui-component-detail";

export function UIComponentPage({ slug }: { slug: string }) {
  const component = getUIComponent(slug);
  if (!component) notFound();

  return <UIComponentDetail component={component} />;
}
