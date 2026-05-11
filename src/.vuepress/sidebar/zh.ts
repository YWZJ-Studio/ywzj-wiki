import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar([
    {
        text: "玩法指南",
        link: "/zh/gameplay/01_installation",
        prefix: "/zh/gameplay/",
        collapsible: true,
        children: "structure"
    },
    {
        text: "载具包制作指南",
        prefix: "/zh/vehicle_pack/",
        collapsible: true,
        children: [
            "01_whats_vehicle_pack",
            "02_files_structure",
            "03_assets",
            "04_display_config",
            "05_vehicle_config",
            "06_structure_model",
            "07_vehicle_type",
            "08_part_unit",
            {
                text: "武器系统",
                prefix: "09_weapon/",
                children: "structure"
            },
            "10_scripting",
            "11_recipes",
            "12_sounds",
            {
                text: "动画控制器",
                prefix: "ani_controller/",
                children: "structure"
            }
        ]
    }
]);
