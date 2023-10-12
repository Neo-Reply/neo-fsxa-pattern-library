import { displayHiddenSections } from "@/utils/getters";
import { shouldHideSection } from "@/utils/misc";
import { PageBodyContent } from "fsxa-api/dist/types";
import { Component } from "vue-property-decorator";
import Section from "../Section";
import BaseComponent from "./BaseComponent";

@Component({
  name: "RenderUtils",
})
class RenderUtils<
  Props = {},
  EventsWithOn = {},
  Slots = {}
> extends BaseComponent<Props, EventsWithOn, Slots> {
  renderContentElement(content: PageBodyContent) {
    if (
      shouldHideSection({
        content,
        displayHiddenSections: displayHiddenSections(this),
        isEditMode: this.isEditMode,
      })
    ) {
      return null;
    }
    switch (content.type) {
      case "Section":
        return (
          <Section
            type={content.sectionType}
            meta={{
              previewId: content.previewId,
              lifespan: content.lifespan,
            }}
            data={content.data}
            id={content.id}
            previewId={content.previewId}
            content={content.children.map(this.renderContentElement)}
          />
        );
      case "Dataset":
        return (
          <Section
            type={content.template}
            data={content.data}
            meta={{
              route: content.route,
              entityType: content.entityType,
              schema: content.schema,
            }}
            id={content.id}
            previewId={content.previewId}
            content={content.children.map(this.renderContentElement)}
          />
        );
      default:
        console.log(
          "Missing render-functionality for given ContentElement",
          content,
        );
        return null;
    }
  }
}

export default RenderUtils;
