---
order: 11
icon: book
---

# 配方与合成

YWZJ提供了两种合成载具的方式：**载具打印配方**（3D打印机）和原版**工作台配方**（弹药、工具等）。

## 载具打印配方

载具通过 **3D打印机**（Machine Max方块）制造。打印配方存放于 `data/<命名空间>/recipes/` 或 `data/<命名空间>/recipe/` 目录。

### 旧版格式（recipes/）

文件名任意，通常以载具ID命名：

```json
{
  "type": "ywzj_vehicle:vehicle_printing",
  "materials": [
    {
      "tag": "forge:ingots/iron",
      "count": 160
    },
    {
      "tag": "forge:ingots/copper",
      "count": 80
    },
    {
      "item": "minecraft:redstone",
      "count": 64
    },
    {
      "item": "minecraft:glass_pane",
      "count": 16
    },
    {
      "item": "minecraft:dispenser",
      "count": 8
    },
    {
      "item": "minecraft:diamond",
      "count": 12
    }
  ],
  "result": {
    "item": "ywzj_vehicle:vehicle_spawn_item",
    "nbt": {
      "YwzjVehicleId": "dragonrise_reforge_ywzj:vt4a1"
    }
  },
  "printingTime": 1500
}
```

### 新版格式（recipe/）

```json
{
  "materials": [
    {
      "count": 160,
      "ingredient": {
        "tag": "c:ingots/iron"
      }
    },
    {
      "count": 64,
      "ingredient": {
        "item": "minecraft:redstone"
      }
    }
  ],
  "result": {
    "id": "ywzj_vehicle:vehicle_spawn_item",
    "count": 1,
    "components": {
      "minecraft:custom_data": {
        "YwzjVehicleId": "dragonrise_reforge_ywzj:vt4a1"
      }
    }
  },
  "printingTime": 1500
}
```

两种格式中 `YwzjVehicleId` 的值 **必须与载具配置文件名一致**。

### 字段说明

| 字段 | 类型 | 说明 |
|:----|:----|:----|
| `type` | string | 固定为 `ywzj_vehicle:vehicle_printing` |
| `materials` | array | 所需材料列表 |
| `materials[].item` | ResourceLocation | 原版物品ID |
| `materials[].tag` | string | 物品标签（如 `forge:ingots/iron`） |
| `materials[].count` | int | 所需数量 |
| `result.item` / `result.id` | ResourceLocation | 输出物品，固定为 `ywzj_vehicle:vehicle_spawn_item` |
| `result.nbt.YwzjVehicleId` | ResourceLocation | 载具ID |
| `printingTime` | int | 打印耗时（tick） |

## 使用3D打印机

1. 摆放 **Machine Max** 方块
2. 右键打开GUI
3. 放入材料（需匹配配方中所有材料）
4. 点击打印按钮
5. 等待打印完成后取出载具刷怪蛋

## 工作台配方

弹药、工具等物品使用原版工作台合成。配方存放于 `data/<命名空间>/recipes/`，格式与原版数据包一致。

### 弹药配方示例

`data/ywzj_vehicle/recipes/ammo_machine_gun.json`：
```json
{
  "type": "minecraft:crafting_shapeless",
  "ingredients": [
    { "item": "minecraft:iron_ingot" },
    { "item": "minecraft:gunpowder" }
  ],
  "result": {
    "item": "ywzj_vehicle:ammo_machine_gun",
    "count": 8
  }
}
```

### 工具配方示例

`data/ywzj_vehicle/recipes/repair_tool.json`：
```json
{
  "type": "minecraft:crafting_shapeless",
  "ingredients": [
    { "item": "minecraft:iron_ingot" },
    { "item": "minecraft:fire_charge" }
  ],
  "result": {
    "item": "ywzj_vehicle:repair_tool",
    "count": 1
  }
}
```

### 燃料补充配方

燃料桶可以补充燃料：

```json
{
  "type": "minecraft:crafting_shapeless",
  "ingredients": [
    { "item": "ywzj_vehicle:fuel_tank" },
    { "item": "minecraft:coal" }
  ],
  "result": {
    "item": "ywzj_vehicle:fuel_tank"
  }
}
```

## 载具包中的配方

在载具包中添加配方与在模组本体中相同，只需将JSON放入载具包的 `data/<命名空间>/recipes/`（或 `recipe/`）目录即可。服务器加载载具包时会自动注册配方。

::: tip
如果载具包仅用于单机/创造模式，配方不是必需的。使用 `/ywzj_vehicle summon` 指令可直接生成载具。
:::
