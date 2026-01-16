import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    {
      text: "载具包",
      icon: "book",
      prefix: "vehicle_pack/",
      children: "structure",
    }
  ],
});
