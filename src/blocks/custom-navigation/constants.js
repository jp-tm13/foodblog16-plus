export const DEFAULT_BLOCK = {
  name: "core/navigation-link",
};

export const PRIORITIZED_INSERTER_BLOCKS = [
  "core/navigation-link/page",
  "core/navigation-link",
];

export const PRELOADED_NAVIGATION_MENUS_QUERY = {
  per_page: 100,
  status: ["publish", "draft"],
  order: "desc",
  orderby: "date",
};

export const SELECT_NAVIGATION_MENUS_ARGS = [
  "postType",
  "wp_navigation",
  PRELOADED_NAVIGATION_MENUS_QUERY,
];
