---
order: 9
icon: book
---

# 武器系统

YWZJ实现了一个基础的武器系统，其关联于一个**武器单元**进行运作。

## 武器配置文件

一个武器配置文件对应一个独立武器，存放于 `data/<命名空间>/weapons/`。

::: tip
武器配置文件名即是武器的唯一id。如 `data/tutorial/weapons/qjt_5.8mm.json` 中，`qjt_5.8mm` 就是武器在注册时的唯一id，是所有与它关联的数据的主键（如载具配置中 `weapons` 内的 `id` 参数）。
:::

武器配置的 `type` 参数决定其使用的武器模板：

```
{
  "type": "ywzj_vehicle:cannon", # 武器模板
  "name": "QJT 5.8mm",
  ...
}
```

## 武器模板枚举

目前官方已实现了 `枪炮`、`榴弹`、`火箭`、`航弹`、`导弹`、`热诱弹` 6种武器模板：

| 模板名 | type | 释义 |
|:----|:----|:----|
| 枪炮 | `ywzj_vehicle:cannon` | 直射火力，可发射子弹/炮弹 |
| 榴弹 | `ywzj_vehicle:grenade` | 抛射爆炸物 |
| 火箭 | `ywzj_vehicle:rocket` | 无制导火箭弹 |
| 航弹 | `ywzj_vehicle:aerial_bomb` | 航空炸弹，仅固定翼可用 |
| 导弹 | `ywzj_vehicle:missile` | 制导导弹 |
| 热诱弹 | `ywzj_vehicle:decoy_flare` | 红外干扰弹 |

## 武器资产配置

武器的资产配置与载具类似，存放于 `assets/<命名空间>/display/weapon/`。

武器一般具有音效，大型弹射物（如导弹）还具有模型和贴图：

```json
{
  "type": "ywzj_vehicle:weapon",
  "sounds": {
    "fire": "ywzj_vehicle:gun_7.62mm_shot",
    "reload": "ywzj_vehicle:gun_reload"
  }
}
```

带模型的导弹资产配置：

```json
{
  "type": "ywzj_vehicle:weapon",
  "model": "ywzj_vehicle:entity/missile_pl_8",
  "texture": "ywzj_vehicle:textures/entity/j8.png",
  "sounds": {
    "fire": "ywzj_vehicle:missile_launch",
    "reload": "ywzj_vehicle:common_reload"
  }
}
```

| 音效键 | 说明 |
|:----|:----|
| `fire` | 开火音效 |
| `reload` | 换弹音效 |
| `shell` | 弹壳落地音效 |
