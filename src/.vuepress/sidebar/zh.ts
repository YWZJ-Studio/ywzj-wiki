import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar([
    {
        text: "载具包制作指南",
        link: "/zh/vehicle_pack/01_whats_vehicle_pack",
        prefix: "/zh/vehicle_pack/",
        collapsible: true,
        children: "structure"
    }
]);
