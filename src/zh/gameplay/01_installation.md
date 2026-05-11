---
order: 1
icon: book
---

# 安装与配置

## 载具包安装

载具包放在游戏目录的 `limitless_vehicle/` 文件夹下：

```
.minecraft/
└─ limitless_vehicle/
   ├─ tutorial_vehicle_pack/     # 教程载具包
   │  ├─ assets/
   │  ├─ data/
   │  ├─ pack.png
   │  └─ vehicle_pack.meta.json
   ├─ my_awesome_pack/           # 另一个载具包
   │  └─ ...
   └─ some_pack.zip              # 也可不解压直接使用
```

::: warning
载具包仅在游戏启动的早期阶段被扫描，**游戏启动后新增的载具包需要重启才能被加载**。但已加载的载具包可通过 `/ywzj_vehicle reload` 热重载内容。
:::

## 配置文件

模组配置文件位于 `config/limitless_vehicle/`：

### 主配置文件

生成于 `config/limitless_vehicle-common.toml` 和 `limitless_vehicle-server.toml`，使用原版Forge配置系统。

**通用配置：**

| 配置项 | 默认值 | 说明 |
|:----|:----|:----|
| `allowMeleeDamageVehicle` | `false` | 近战是否能伤害载具 |
| `canDestroyBlock` | `true` | 载具是否能破坏方块 |
| `explosionDropBlock` | `true` | 爆炸是否掉落方块 |
| `vehicleExplosionHurtPassengerDamage` | `512.0` | 载具爆炸对乘客的伤害值 |
| `selfRighting` | `true` | 倾角过大时是否自动回正 |
| `infiniteFuel` | `false` | 是否无需燃油即可运作 |
| `fuelNameWhiteList` | `["fuel","gas","lava"]` | 允许视作燃油的液体ID关键词 |
| `hitIndicator` | `true` | 是否显示命中提示 |
| `checkTeamOnEnterVehicle` | `true` | 载具乘客是否需要同队 |
| `figureBoxOnlyCaptureVehicle` | `false` | 手办盒是否只能收纳载具 |

**服务器配置：**

| 配置项 | 默认值 | 说明 |
|:----|:----|:----|
| `showVehicleInfoDistance` | `512.0` | 看向载具时展示信息的最大距离（block） |
| `serverBroadcastEntitiesInterval` | `5` | 超视距实体广播时间间隔（tick） |

### 外部配置文件

位于 `config/limitless_vehicle/` 目录：

- `figure_box_capture_blacklist.txt` — 手办盒禁止捕获的实体ID列表（每行一个，支持正则），默认禁止末影龙、尸体等
- `server_broadcast_entity_whitelist.txt` — 超视距广播的实体ID列表（每行一个，支持正则），默认可广播 Superb Warfare 实体

::: tip
修改外部配置文件后执行 `/ywzj_vehicle reload` 即可生效。
:::

## 载具包兼容性

载具包的 `vehicle_pack.meta.json` 中使用 `dependencies` 字段声明依赖：

```json
{
  "dependencies": {
    "ywzj_vehicle": "[0.5.3,)"
  }
}
```

以上声明要求模组版本不低于 0.5.3。不满足版本要求的载具包会跳过加载。
