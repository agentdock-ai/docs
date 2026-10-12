import Link from "next/link";
import { uiComponents } from "@/components/ui-component-catalog";

const groups = [...new Set(uiComponents.map((component) => component.group))];

export function UIComponentGallery() {
  return (
    <div className="ad-ui-gallery">
      {groups.map((group) => (
        <section className="ad-ui-gallery-group" key={group}>
          <h3>{group}</h3>
          <div className="ad-ui-gallery-grid">
            {uiComponents
              .filter((component) => component.group === group)
              .map((component) => (
                <Link
                  className="ad-ui-gallery-card"
                  href={`/docs/ui/components/${component.slug}`}
                  key={component.slug}
                >
                  <figure className="ad-ui-gallery-preview">
                    <img
                      className="ad-ui-preview-light"
                      src={`/ui-components/${component.image}.png`}
                      alt={`${component.name} preview`}
                    />
                    <img
                      className="ad-ui-preview-dark"
                      src={`/ui-components/${component.image}-dark.png`}
                      alt=""
                      aria-hidden="true"
                    />
                  </figure>
                  <div className="ad-ui-gallery-copy">
                    <h4>{component.name}</h4>
                    <p>{component.description}</p>
                    <span>Preview and usage →</span>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
