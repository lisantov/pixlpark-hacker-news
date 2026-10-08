import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("./widgets/layouts/ui/DefaultLayout.tsx", [index("pages/home.tsx")]),
] satisfies RouteConfig;
