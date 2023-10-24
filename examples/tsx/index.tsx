import { Component } from "vue-property-decorator";
import { Component as TsxComponent } from "vue-tsx-support";
import { FSXAApp } from "fsxa-pattern-library";
import AppLayout from "./components/AppLayout";
import StandardLayout from "./components/layouts/StandardLayout";
import ProductDetailSection from "./components/sections/ProductDetailSection";
import TeaserSection from "./components/sections/TeaserSection";
import Paragraph from "./components/richtext/Paragraph";
import Text from "./components/richtext/Text";
import List from "./components/richtext/List";
import ListItem from "./components/richtext/ListItem";
import CategoryProducts from "./components/sections/CategoryProducts";

@Component({
  name: "App",
})
class App extends TsxComponent<{}> {
  route = location.pathname;

  mounted() {
    window.addEventListener("popstate", this.onRouteChange);
    window.addEventListener("pushstate", this.onRouteChange);
  }

  beforeDestroy() {
    window.removeEventListener("popstate", this.onRouteChange);
    window.removeEventListener("pushstate", this.onRouteChange);
  }

  onRouteChange() {
    this.route = location.pathname;
  }

  changeRoute(route: string) {
    history.pushState(null, "Title", route);
    this.route = route;
  }

  render() {
    return (
      <FSXAApp
        defaultLocale="de_DE"
        currentPath={this.route}
        devMode
        handleRouteChange={this.changeRoute}
        components={{
          appLayout: AppLayout,
          layouts: {
            standard: StandardLayout,
            newsroom_detailpage: StandardLayout,
          },
          sections: {
            "products.product": ProductDetailSection,
            teaser: TeaserSection,
            text: TeaserSection,
            "products.category_products": CategoryProducts,
          },
          richtext: {
            paragraph: Paragraph,
            text: Text,
            list: List,
            listitem: ListItem,
          },
        }}
      />
    );
  }
}
export default App;
