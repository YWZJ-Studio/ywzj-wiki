import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/ywzj-wiki/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Limitless Vehicle",
      description: "Vehicle Dev Docs",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "永无止境：载具",
      description: "载具包开发文档",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
