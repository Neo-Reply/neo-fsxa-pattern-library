import Component from "vue-class-component";
import BaseLayout from "./BaseLayout";

export interface Slide {
  previewId: string;
  identifier: string;
  data: any;
}
export interface Data {
  pt_show_chat: boolean;
  pt_slider: Slide[];
}
@Component({
  name: "HomepageLayout",
})
class HomepageLayout extends BaseLayout<Data> {
  render() {
    return (
      <div data-preview-id={this.content[0].previewId}>
        {/**<div class="w-full p-20 -mt-20 h-screen">
          <Slider slides={this.pt_slider} />
    </div>**/}
        {this.content.length > 0 && this.renderContentElements(0)}
      </div>
    );
  }
}
export default HomepageLayout;