import LazyLoad from "@/utils/AsyncRouteHelper";
import VuseRoutes from "./routes/vuse";
const AppSidebar = () =>
  import(
    /* webpackChunkName: "Vusenavs", webpackPreload: true */ "@/layouts/App/Sidebar"
  );
const AppToolbar = () =>
  import(
    /* webpackChunkName: "Vusenavs", webpackPreload: true */ "@/layouts/App/Toolbar"
  );
const AppFooter = () =>
  import(
    /* webpackChunkName: "Vusenavs",  webpackPreload: true */ "@/layouts/App/Footer"
  );

const AllRoutes = [...VuseRoutes];
const routes = AllRoutes.map((route) => {
  const { params, defaultComponentPath, navs } = route;
  const componentObj = navs
    ? {
        components: {
          default: LazyLoad(defaultComponentPath),
          sidebar: AppSidebar,
          header: AppToolbar,
          footer: AppFooter,
        },
      }
    : {
        component: LazyLoad(defaultComponentPath),
      };
  return {
    ...params,
    ...componentObj,
  };
});

export default [{ path: "/", redirect: "/authentication/login" }, ...routes];
