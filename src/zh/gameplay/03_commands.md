---
order: 3
icon: book
---

# 指令

YWZJ提供 `/ywzj_vehicle` 根指令，所有子指令需要 **权限等级2** 以上（默认需OP权限）。

## summon — 生成载具

```
/ywzj_vehicle summon <vehicle_id> [display_id]
```

- `vehicle_id` — 载具的VehicleId，如 `ywzj_vehicle:ztz99a`、`dragonrise_reforge_ywzj:vt4a1`
- `display_id`（可选）— 皮肤的DisplayId，不填则使用默认皮肤

该指令支持Tab补全：
- 补全 `vehicle_id` 时列出所有已加载的载具ID
- 补全 `display_id` 时列出对应载具的所有可用皮肤

使用示例：
```
# 生成一辆99A坦克（默认皮肤）
/ywzj_vehicle summon ywzj_vehicle:ztz99a

# 生成一架J-15T，使用特定皮肤
/ywzj_vehicle summon dragonrise_reforge_ywzj:j15t dragonrise_reforge_ywzj:j15t
```

## reload — 热重载

```
/ywzj_vehicle reload
```

重新加载所有载具包数据，包括：
- 载具配置（`data/*/vehicles/`）
- 武器配置（`data/*/weapons/`）
- 结构模型（`data/*/models/bedrock/vehicle/`）
- 客户端资产（模型、贴图、动画、控制器、脚本等）

热重载完成后会显示耗时（毫秒），已生成的载具也会重新加载配置。

::: tip
在载具包开发过程中，修改JSON后使用此命令即可立即看到效果，无需重启游戏。但**新增的载具包**仍需重启客户端才能被扫描识别。
:::

## debug — 调试模式

```
/ywzj_vehicle debug <true/false>
```

开启/关闭调试模式：
- `true` — 显示实体的碰撞箱（包括OBB碰撞体）
- `false` — 关闭调试显示

此功能依赖客户端渲染，当前仅对执行指令的玩家生效。
